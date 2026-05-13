import { getCourses } from '@/app/actions/queries';
import { createCourse, deleteCourse } from '@/app/actions/mutations';

export const revalidate = 0;

export default async function AdminLmsPage() {
  const courses = await getCourses();

  return (
    <div className="space-y-12">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div className="space-y-1">
          <h1 className="text-3xl font-black uppercase tracking-tight leading-none">Learning Management</h1>
          <p className="text-xs text-on-surface-variant font-medium opacity-60 italic">Academy Training & Certification Framework</p>
        </div>
      </header>

      {/* Create Course Form */}
      <div className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl p-8">
        <h2 className="text-sm font-black uppercase tracking-widest text-primary mb-6">Deploy New Course</h2>
        <form action={createCourse} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Course Title</label>
            <input name="title" type="text" required placeholder="Course name..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Thumbnail URL (optional)</label>
            <input name="thumbnailUrl" type="url" placeholder="https://..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20" />
          </div>
          <div className="md:col-span-2 space-y-2">
            <label className="block text-xs font-bold text-on-surface-variant uppercase tracking-widest">Description</label>
            <textarea name="description" rows={3} placeholder="What will members learn..." className="w-full border border-outline-variant/30 rounded-lg p-3 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-primary/20"></textarea>
          </div>
          <div className="md:col-span-2">
            <button type="submit" className="w-full bg-primary text-white font-black text-xs uppercase tracking-widest py-3 rounded-lg hover:bg-primary/90 transition-all shadow-lg shadow-primary/20">
              Create Course
            </button>
          </div>
        </form>
      </div>

      {/* Courses Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {courses.map((course) => (
          <div key={course.id} className="bg-white/70 backdrop-blur-xl rounded-3xl border border-white shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-500 overflow-hidden flex flex-col group">
            <div className="relative h-40 overflow-hidden bg-surface-container-low">
               {course.thumbnailUrl ? (
                 <img src={course.thumbnailUrl} alt={course.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
               ) : (
                 <div className="w-full h-full flex items-center justify-center">
                   <span className="material-symbols-outlined text-4xl text-outline-variant/40">school</span>
                 </div>
               )}
            </div>
            <div className="p-6 flex-1 flex flex-col space-y-3">
              <h3 className="text-base font-black text-on-surface uppercase tracking-tight group-hover:text-primary transition-colors leading-tight">{course.title}</h3>
              <p className="text-xs text-on-surface-variant opacity-60 line-clamp-2 flex-1">{course.description}</p>
              <div className="flex items-center justify-between pt-4 border-t border-outline/5">
                <span className="text-[10px] font-bold text-on-surface-variant uppercase opacity-60 flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm">play_circle</span>
                  {course.modulesCount ?? 0} Modules
                </span>
                <form action={deleteCourse.bind(null, course.id)}>
                  <button type="submit" className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-400 hover:bg-red-100 transition-all">
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </form>
              </div>
            </div>
          </div>
        ))}

        {courses.length === 0 && (
          <div className="col-span-full text-center py-16 text-on-surface-variant/50 text-sm font-bold uppercase tracking-widest">
            No courses yet. Create one above.
          </div>
        )}
      </div>
    </div>
  );
}
