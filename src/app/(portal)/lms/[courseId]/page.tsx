import { notFound } from 'next/navigation';
import { staticCourses } from '@/data/coursesData';
import LMSCoursePlayerClient from './LMSCoursePlayerClient';

export default async function CourseDetailPage({ 
  params 
}: { 
  params: Promise<{ courseId: string }> 
}) {
  const { courseId } = await params;
  const courseItem = staticCourses.find(c => c.id === courseId);

  if (!courseItem) {
    notFound();
  }

  const { modules, ...course } = courseItem;

  return (
    <LMSCoursePlayerClient 
      course={{
        id: course.id,
        title: course.title,
        description: course.description ?? null,
        thumbnailUrl: course.thumbnailUrl ?? null,
      }} 
      modules={modules} 
    />
  );
}
