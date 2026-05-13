import { getCourses } from '@/app/actions/queries';
import { createCourse, deleteCourse } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminLmsPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-12 pb-20">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
        <div className="space-y-2">
          <h1 className="text-4xl font-black uppercase tracking-tighter leading-none text-on-surface">Knowledge Transfer</h1>
          <p className="text-[11px] text-on-surface-variant font-bold uppercase tracking-[0.3em] opacity-40 italic">Manage Academy Training & Certification Protocols</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="px-6 py-3 rounded-2xl bg-primary/5 border border-primary/10 flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-primary animate-pulse"></div>
            <span className="text-[10px] font-black uppercase tracking-widest text-primary">Learning Matrix Active</span>
          </div>
        </div>
      </header>

      {/* Deploy New Course Form */}
      <section className="bg-white/80 backdrop-blur-2xl rounded-[3rem] border border-white p-12 shadow-2xl shadow-primary/5">
        <div className="flex items-center gap-5 mb-12">
           <div className="w-14 h-14 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary shadow-inner">
              <span className="material-symbols-outlined text-3xl">school</span>
           </div>
           <div>
              <h2 className="text-2xl font-black uppercase tracking-tight leading-none text-on-surface">Deploy Curriculum</h2>
              <p className="text-[10px] text-on-surface-variant font-black uppercase tracking-[0.2em] opacity-40 mt-2 italic">Initialize New Educational Stream to District Registry</p>
           </div>
        </div>

        <form action={createCourse} className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Course Designation (Title)</label>
            <input name="title" type="text" required placeholder="e.g. DISTRICT LEADERSHIP PROTOCOLS" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20" />
          </div>
          <div className="space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Cover Visualization (Thumbnail URL)</label>
            <input name="thumbnailUrl" type="url" placeholder="https://storage.district3192.org/course-cover.jpg" className="w-full bg-surface-container-low border-none rounded-[1.5rem] py-5 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20" />
          </div>
          <div className="md:col-span-2 space-y-3">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-on-surface-variant ml-4 opacity-50">Syllabus Overview / Description</label>
            <textarea name="description" rows={3} placeholder="Define core educational objectives and learning outcomes..." className="w-full bg-surface-container-low border-none rounded-[2rem] py-6 px-8 text-sm font-bold text-on-surface focus:ring-4 focus:ring-primary/10 focus:outline-none transition-all placeholder:opacity-20"></textarea>
          </div>
          <div className="md:col-span-2 flex justify-end">
            <button type="submit" className="bg-primary text-white font-black uppercase tracking-[0.2em] text-[11px] px-16 py-6 rounded-[1.5rem] shadow-2xl shadow-primary/30 hover:scale-[1.02] active:scale-95 transition-all flex items-center justify-center gap-4">
              <span className="material-symbols-outlined text-xl">account_tree</span>
              Execute Deployment
            </button>
          </div>
        </form>
      </section>

      {/* Curriculum Registry */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.length === 0 ? (
          <div className="col-span-full py-32 text-center text-[10px] font-black text-on-surface-variant/20 uppercase tracking-[0.5em] italic">No curriculum assets identified in academy registry.</div>
        ) : (
          courses.map((course) => (
            <div key={course.id} className="bg-white/70 backdrop-blur-xl rounded-[2.5rem] border border-white shadow-xl hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 overflow-hidden flex flex-col group">
              <div className="relative h-48 overflow-hidden bg-surface-container-low">
                 {course.thumbnailUrl ? (
                   <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                 ) : (
                   <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-surface-container-low to-surface-container-high">
                     <span className="material-symbols-outlined text-5xl text-primary/10 group-hover:scale-125 transition-transform duration-700">architecture</span>
                   </div>
                 )}
                 <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center text-[10px] font-black text-white shadow-lg">
                    {(course.id || 'XX').slice(-2).toUpperCase()}
                 </div>
              </div>
              <div className="p-8 flex-1 flex flex-col space-y-4">
                <h3 className="text-lg font-black text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
                <p className="text-[11px] text-on-surface-variant font-medium opacity-60 line-clamp-3 leading-relaxed flex-1 italic">{course.description}</p>
                <div className="flex items-center justify-between pt-6 border-t border-outline/5">
                  <div className="flex items-center gap-2 px-3 py-1 bg-primary/5 rounded-lg border border-primary/10">
                    <span className="material-symbols-outlined text-sm text-primary">auto_stories</span>
                    <span className="text-[9px] font-black text-primary uppercase tracking-widest">
                      {course.modulesCount ?? 0} UNITS
                    </span>
                  </div>
                  <form action={deleteCourse.bind(null, course.id)}>
                    <button type="submit" className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-500 hover:text-white transition-all shadow-sm">
                      <span className="material-symbols-outlined text-lg">delete_forever</span>
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

