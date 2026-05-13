import { getCourses } from '@/app/actions/queries';
import { createCourse, deleteCourse } from '@/app/actions/mutations';
import Image from 'next/image';

export const revalidate = 0;

export default async function AdminLmsPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-16 pb-24">
      <header className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10">
        <div className="space-y-4">
          <span className="inline-block px-4 py-1.5 rounded-full bg-primary/5 text-primary text-[10px] font-black tracking-[0.4em] uppercase border border-primary/10">Academy Protocol</span>
          <h1 className="text-5xl md:text-7xl font-black text-on-surface tracking-tighter font-display uppercase leading-none italic">
            Knowledge <span className="text-primary not-italic">Transfer.</span>
          </h1>
          <p className="text-on-surface-variant text-sm font-medium opacity-60 italic flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse shadow-[0_0_10px_rgba(var(--color-primary-rgb),0.5)]"></span>
            Manage Academy Training & Certification Protocols
          </p>
        </div>
      </header>

      {/* Deploy New Course Form */}
      <section className="bg-surface-container-low/70 backdrop-blur-3xl rounded-[3.5rem] p-12 lg:p-16 border border-outline-variant/30 shadow-ambient relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -z-10"></div>
        <div className="flex items-center gap-8 mb-12">
           <div className="w-20 h-20 rounded-[2rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner border border-primary/20">
              <span className="material-symbols-outlined text-4xl">school</span>
           </div>
           <div>
              <h2 className="text-3xl font-black font-display uppercase tracking-tight leading-none text-on-surface italic">Deploy <span className="text-primary not-italic">Curriculum.</span></h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.3em] opacity-40 mt-3 italic">Initialize New Educational Stream to District Registry</p>
           </div>
        </div>

        <form action={createCourse} className="space-y-10 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Course Designation (Title)</label>
              <input 
                name="title" 
                type="text" 
                placeholder="MISSION DESIGNATION" 
                required
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest"
              />
            </div>
            <div className="space-y-4">
              <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Cover Visualization (URL)</label>
              <input 
                name="thumbnailUrl" 
                type="url" 
                placeholder="https://storage.district3192.org/asset-01.jpg" 
                className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2rem] py-6 px-10 text-sm font-black text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all placeholder:text-on-surface-variant/20 uppercase tracking-widest"
              />
            </div>
          </div>
          
          <div className="space-y-4">
            <label className="text-[10px] font-black uppercase tracking-[0.4em] text-primary ml-6 italic">Syllabus Overview</label>
            <textarea 
              name="description" 
              rows={4}
              placeholder="Define core educational objectives and learning outcomes..." 
              className="w-full bg-surface-container-high/50 border border-outline-variant/30 rounded-[2.5rem] py-8 px-10 text-sm font-medium text-on-surface shadow-inner focus:border-primary/50 outline-none transition-all resize-none italic leading-relaxed placeholder:text-on-surface-variant/20"
            ></textarea>
          </div>

          <div className="flex justify-end">
            <button 
              type="submit"
              className="bg-primary text-white font-black uppercase tracking-[0.4em] text-[11px] px-16 py-6 rounded-2xl shadow-2xl shadow-primary/30 hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-4 group"
            >
              <span className="material-symbols-outlined text-xl group-hover:rotate-45 transition-transform">account_tree</span>
              Execute Deployment
            </button>
          </div>
        </form>
      </section>

      {/* Curriculum Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
        {courses.length === 0 ? (
          <div className="col-span-full bg-surface-container-low/30 rounded-[4rem] border border-outline-variant/30 py-40 text-center space-y-8 border-dashed">
            <div className="w-24 h-24 bg-surface-container-high rounded-full flex items-center justify-center mx-auto border border-outline-variant/30">
              <span className="material-symbols-outlined text-5xl text-on-surface-variant/20">school</span>
            </div>
            <p className="text-[11px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">NO CURRICULUM ASSETS IDENTIFIED IN REGISTRY</p>
          </div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-surface-container-low/70 backdrop-blur-xl rounded-[3.5rem] border border-outline-variant/30 shadow-ambient overflow-hidden group hover:bg-white hover:shadow-2xl transition-all duration-700 flex flex-col relative">
               <div className="h-64 w-full relative overflow-hidden bg-surface-container-high">
                  {course.thumbnailUrl ? (
                    <img src={course.thumbnailUrl} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000 grayscale group-hover:grayscale-0" alt={course.title} />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container-low to-surface-container-high">
                      <span className="material-symbols-outlined text-7xl text-primary/10 group-hover:scale-125 transition-transform duration-700">architecture</span>
                    </div>
                  )}
                  <div className="absolute top-8 right-8 px-5 py-2 bg-primary text-white rounded-full text-[9px] font-black uppercase tracking-[0.3em] border border-white/20 shadow-xl italic">
                    {(course.id || 'XX').slice(-4).toUpperCase()}
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-60"></div>
               </div>
               
               <div className="p-10 space-y-8 flex-1 flex flex-col justify-between">
                  <div className="space-y-6">
                    <div className="flex items-center gap-3">
                       <span className="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                       <p className="text-[10px] font-black text-primary uppercase tracking-[0.3em] italic">KNOWLEDGE STREAM ACTIVE</p>
                    </div>
                    
                    <h3 className="text-2xl font-black text-on-surface font-display uppercase tracking-tighter leading-none group-hover:text-primary transition-colors italic leading-none">{course.title}</h3>
                    
                    <p className="text-sm text-on-surface-variant font-medium line-clamp-3 opacity-60 leading-relaxed italic">
                      "{course.description || 'No detailed syllabus overview provided for this curriculum asset.'}"
                    </p>
                  </div>
                  
                  <div className="pt-8 border-t border-outline-variant/30 flex justify-between items-center">
                     <div className="flex items-center gap-4 px-5 py-2 bg-primary/5 rounded-xl border border-primary/10">
                        <span className="material-symbols-outlined text-base text-primary">auto_stories</span>
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest italic">
                          {course.modulesCount ?? 0} UNITS
                        </span>
                     </div>
                     <form action={deleteCourse.bind(null, course.id)}>
                       <button type="submit" className="w-12 h-12 rounded-2xl bg-surface-container-high border border-outline-variant/30 text-error/30 hover:bg-error hover:text-white hover:border-error transition-all group/del">
                         <span className="material-symbols-outlined text-xl group-hover/del:scale-110 transition-transform">delete_forever</span>
                       </button>
                     </form>
                  </div>
               </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
