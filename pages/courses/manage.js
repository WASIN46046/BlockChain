
import { OwnedCourseCard } from "@components/ui/course";
import { BaseLayout } from "@components/ui/layout";
import { MarketHeader } from "@components/ui/marketplace";

export default function ManageCourses() {

  return (
    <>

      <MarketHeader />
      <CourseFilter />

      <section className="grid grid-cols-1">
        <OwnedCourseCard />
      </section>
    </>
  )
}
ManageCourses.Layout = BaseLayout