import { notFound } from 'next/navigation';
import { getCourseById, getCourseModules } from '@/app/actions/queries';
import LMSCoursePlayerClient from './LMSCoursePlayerClient';

export const revalidate = 0;

export default async function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ courseId: string }> 
}) {
  const { courseId } = await params;
  
  const [course, modules] = await Promise.all([
    getCourseById(courseId),
    getCourseModules(courseId)
  ]);

  if (!course) {
    notFound();
  }

  return (
    <LMSCoursePlayerClient 
      course={course} 
      modules={modules} 
    />
  );
}
