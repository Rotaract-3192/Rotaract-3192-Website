import { getCourses } from '@/app/actions/queries';
import { createCourse, deleteCourse } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminLmsPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-16 pb-24 px-4 lg:px-8">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 px-4 py-1.5 rounded-full border border-primary/20 bg-primary/5 backdrop-blur-md">
            <div className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_#3B82F6]"></div>
            <span className="text-[10px] font-bold text-primary uppercase tracking-[0.4em]">Academy Management</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-white tracking-tight font-display uppercase leading-none">
            District <span className="text-primary">Academy</span>
          </h1>
          <p className="text-text-muted text-sm font-medium opacity-60 flex items-center gap-3 font-sans">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
            Manage training modules, certification resources, and curricula.
          </p>
        </div>
      </header>

      {/* Deploy New Course Form */}
      <section className="glass-panel p-10 lg:p-14 relative overflow-hidden">
        <div className="flex items-center gap-8 mb-12">
           <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
              <span className="material-symbols-outlined text-3xl">school</span>
           </div>
           <div>
              <h2 className="text-3xl font-bold font-display uppercase tracking-tight leading-none text-white">Create <span className="text-primary">Course</span></h2>
              <p className="text-[10px] text-text-muted font-bold uppercase tracking-[0.3em] opacity-40 mt-3 font-sans">Add a new educational resource to the district academy</p>
           </div>
        </div>

        <form action={createCourse} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Course Title</label>
              <input 
                name="title" 
                type="text" 
                placeholder="Enter course name..." 
                required
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
              />
            </div>
            <div className="space-y-3">
              <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Thumbnail URL</label>
              <input 
                name="thumbnailUrl" 
                type="url" 
                placeholder="https://example.com/image.jpg" 
                className="w-full bg-white/5 border border-white/10 rounded-xl py-5 px-8 text-sm font-bold text-white focus:border-primary/50 outline-none transition-all placeholder:text-white/20 uppercase tracking-widest font-sans"
              />
            </div>
          </div>
          
          <div className="space-y-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.4em] text-primary ml-4 font-sans">Course Description</label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Detail the course curriculum and learning outcomes..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 px-8 text-sm font-medium text-white focus:border-primary/50 outline-none transition-all resize-none leading-relaxed placeholder:text-white/20 font-sans"
            ></textarea>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit"
              className="bg-primary text-white font-bold uppercase tracking-[0.4em] text-[11px] px-14 py-5 rounded-xl shadow-xl shadow-primary/20 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-3 group font-sans"
            >
              <span className="material-symbols-outlined text-lg group-hover:rotate-12 transition-transform">account_tree</span>
              Publish Course
            </button>
          </div>
        </form>
      </section>

      {/* Curriculum Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.length === 0 ? (
          <div className="col-span-full glass-panel py-40 text-center space-y-8">
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto border border-white/10">
              <span className="material-symbols-outlined text-4xl text-text-muted/20">school</span>
            </div>
            <p className="text-[10px] font-bold text-text-muted/20 uppercase tracking-[0.5em] font-sans">No courses currently available in the academy</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="glass-panel rounded-[2.5rem] overflow-hidden group hover:bg-white/5 hover:shadow-2xl transition-all duration-700 flex flex-col relative">
               <div className="h-60 w-full relative overflow-hidden bg-white/5">
                  {course.thumbnailUrl ? (
                    <img src={course.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0 opacity-60 group-hover:opacity-100" alt={course.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-white/5 to-white/10">
                      <span className="material-symbols-outlined text-6xl text-primary/10 group-hover:scale-125 transition-transform duration-700">architecture</span>
                    </div>
                  )}
                  <div className="absolute top-6 right-6 px-4 py-1.5 bg-primary text-white rounded-full text-[8px] font-bold uppercase tracking-[0.3em] shadow-xl">
                    ID: {(course.id || 'XX').slice(-4).toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0F1C] via-transparent to-transparent opacity-80"></div>
               </div>
               
               <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_#3B82F6]"></span>
                       <p className="text-[9px] font-bold text-primary uppercase tracking-[0.3em] font-sans">Active Resource</p>
                    </div>
                    
                    <h3 className="text-2xl font-bold text-white font-display uppercase tracking-tight leading-tight group-hover:text-primary transition-colors leading-none">{course.title}</h3>
                    
                    <p className="text-sm text-text-muted font-medium line-clamp-3 opacity-60 leading-relaxed font-sans">
                      {course.description || 'No description available for this academy resource.'}
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-white/5 flex justify-between items-center">
                     <div className="flex items-center gap-4 px-4 py-2 bg-primary/5 rounded-xl border border-primary/10">
                        <span className="material-symbols-outlined text-base text-primary">auto_stories</span>
                        <span className="text-[9px] font-bold text-primary uppercase tracking-widest font-sans">
                          {course.modulesCount ?? 0} Modules
                        </span>
                     </div>
                     <form action={deleteCourse.bind(null, course.id)}>
                       <button type="submit" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 text-red-500/30 hover:bg-red-500 hover:text-white hover:border-red-500 transition-all group/del">
                         <span className="material-symbols-outlined text-lg group-hover/del:scale-110 transition-transform">delete</span>
                       </button>
                     </form>
                  </div>
               </div>
            </div>
          ))
        )}
      </section>
    </div>
  );
}
