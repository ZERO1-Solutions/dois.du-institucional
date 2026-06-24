import { NextResponse } from 'next/server';
import { getSupabaseServer } from '@/lib/supabase';

// Helper to check auth
function isAuthenticated(request: Request) {
  const cookie = request.headers.get('cookie');
  return cookie?.includes('admin_session=true');
}

export async function GET() {
  const supabaseServer = getSupabaseServer();
  
  // Check if Supabase credentials are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ error: 'Supabase credentials not configured' }, { status: 500 });
  }

  try {
    // Fetch all data from Supabase tables
    const [
      { data: siteSettings },
      { data: homeContent },
      { data: services },
      { data: testimonials },
      { data: projects },
      { data: aboutContent }
    ] = await Promise.all([
      supabaseServer.from('site_settings').select('*').single(),
      supabaseServer.from('home_content').select('*').single(),
      supabaseServer.from('services').select('*').order('sort_order', { ascending: true }),
      supabaseServer.from('testimonials').select('*').order('sort_order', { ascending: true }),
      supabaseServer.from('projects').select('*, project_gallery(*)').order('sort_order', { ascending: true }),
      supabaseServer.from('about_content').select('*').single()
    ]);

    // Format data into the same structure as data.json for compatibility
    const formattedData = {
      site: {
        name: siteSettings?.site_name || 'dois.du',
        description: siteSettings?.site_description || '',
        contactEmail: siteSettings?.contact_email || '',
        whatsappNumber: siteSettings?.whatsapp_number || '',
        instagramLink: siteSettings?.instagram_link || '',
        facebookLink: siteSettings?.facebook_link || '',
        linkedinLink: siteSettings?.linkedin_link || '',
        behanceLink: siteSettings?.behance_link || ''
      },
      home: {
        title: homeContent?.title || '',
        description: homeContent?.description || ''
      },
      testimonials: testimonials?.map(t => ({
        name: t.name,
        company: t.company,
        text: t.text
      })) || [],
      services: services?.map(s => ({
        title: s.title,
        description: s.description
      })) || [],
      projects: projects?.map(p => ({
        id: p.id,
        title: p.title,
        category: p.category,
        year: p.year,
        description: p.description,
        coverImage: p.cover_image,
        galleryImages: p.project_gallery?.map((g: any) => g.image_url) || [],
        client: p.client,
        objective: p.objective,
        challenge: p.challenge,
        solution: p.solution
      })) || [],
      about: {
        title: aboutContent?.title || '',
        description1: aboutContent?.description1 || '',
        description2: aboutContent?.description2 || '',
        philosophy: aboutContent?.philosophy || '',
        philosophyText: aboutContent?.philosophy_text || ''
      }
    };

    return NextResponse.json(formattedData);
  } catch (error) {
    console.error('Error fetching data:', error);
    return NextResponse.json({ error: 'Failed to fetch data from Supabase' }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!isAuthenticated(request)) {
    return NextResponse.json({ success: false, message: 'Não autorizado' }, { status: 401 });
  }

  const supabaseServer = getSupabaseServer();

  // Check if Supabase credentials are available
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL || !process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return NextResponse.json({ success: false, message: 'Supabase credentials not configured' }, { status: 500 });
  }

  try {
    const newData = await request.json();

    // Update all tables in parallel
    await Promise.all([
      // Update site_settings
      supabaseServer.from('site_settings').upsert({
        id: 1,
        site_name: newData.site.name,
        site_description: newData.site.description,
        contact_email: newData.site.contactEmail,
        whatsapp_number: newData.site.whatsappNumber,
        instagram_link: newData.site.instagramLink,
        facebook_link: newData.site.facebookLink,
        linkedin_link: newData.site.linkedinLink,
        behance_link: newData.site.behanceLink
      }),

      // Update home_content
      supabaseServer.from('home_content').upsert({
        id: 1,
        title: newData.home.title,
        description: newData.home.description
      }),

      // Update services - first delete existing, then insert new ones
      supabaseServer.from('services').delete().neq('id', 0),
      ...newData.services.map((service: any, index: number) =>
        supabaseServer.from('services').insert({
          title: service.title,
          description: service.description,
          sort_order: index
        })
      ),

      // Update testimonials - first delete existing, then insert new ones
      supabaseServer.from('testimonials').delete().neq('id', 0),
      ...newData.testimonials.map((testimonial: any, index: number) =>
        supabaseServer.from('testimonials').insert({
          name: testimonial.name,
          company: testimonial.company,
          text: testimonial.text,
          sort_order: index
        })
      ),

      // Update about_content
      supabaseServer.from('about_content').upsert({
        id: 1,
        title: newData.about.title,
        description1: newData.about.description1,
        description2: newData.about.description2,
        philosophy: newData.about.philosophy,
        philosophy_text: newData.about.philosophyText
      }),

      // Update projects and project_gallery
      ...newData.projects.map(async (project: any, index: number) => {
        // First, check if project exists
        const { data: existingProject } = await supabaseServer
          .from('projects')
          .select('id')
          .eq('id', project.id)
          .single();

        if (existingProject) {
          // Update existing project
          await supabaseServer.from('projects').update({
            title: project.title,
            category: project.category,
            year: project.year,
            description: project.description,
            cover_image: project.coverImage,
            client: project.client,
            objective: project.objective,
            challenge: project.challenge,
            solution: project.solution,
            sort_order: index
          }).eq('id', project.id);

          // Delete existing gallery images
          await supabaseServer.from('project_gallery').delete().eq('project_id', project.id);

          // Insert new gallery images
          if (project.galleryImages?.length > 0) {
            await supabaseServer.from('project_gallery').insert(
              project.galleryImages.map((url: string, imgIndex: number) => ({
                project_id: project.id,
                image_url: url,
                sort_order: imgIndex
              }))
            );
          }
        } else {
          // Insert new project
          const { data: insertedProject } = await supabaseServer.from('projects').insert({
            title: project.title,
            category: project.category,
            year: project.year,
            description: project.description,
            cover_image: project.coverImage,
            client: project.client,
            objective: project.objective,
            challenge: project.challenge,
            solution: project.solution,
            sort_order: index
          }).select('id').single();

          // Insert gallery images for new project
          if (insertedProject && project.galleryImages?.length > 0) {
            await supabaseServer.from('project_gallery').insert(
              project.galleryImages.map((url: string, imgIndex: number) => ({
                project_id: insertedProject.id,
                image_url: url,
                sort_order: imgIndex
              }))
            );
          }
        }
      }),

      // Delete projects that are no longer in newData
      (async () => {
        const { data: allProjects } = await supabaseServer.from('projects').select('id');
        const existingIds = allProjects?.map(p => p.id) || [];
        const newIds = newData.projects.map((p: any) => p.id);
        const idsToDelete = existingIds.filter(id => !newIds.includes(id));
        
        if (idsToDelete.length > 0) {
          await supabaseServer.from('projects').delete().in('id', idsToDelete);
        }
      })()
    ]);

    return NextResponse.json({ success: true, data: newData });
  } catch (error) {
    console.error('Error saving data:', error);
    return NextResponse.json({ success: false, message: 'Erro ao salvar dados no Supabase' }, { status: 500 });
  }
}
