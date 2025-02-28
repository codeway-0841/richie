import React from 'react';
import { defineMessages, FormattedMessage } from 'react-intl';

import { CommonDataProps } from 'types/commonDataProps';
import { Course } from 'types/Course';
import { CourseGlimpseFooter } from './CourseGlimpseFooter';

export interface CourseGlimpseProps {
  course: Course;
}

const messages = defineMessages({
  cover: {
    defaultMessage: 'Cover',
    description: 'Placeholder text when the course we are glimpsing at is missing a cover image',
    id: 'components.CourseGlimpse.cover',
  },
});

const CourseGlimpseBase = ({ context, course }: CourseGlimpseProps & CommonDataProps) => (
  <a className="course-glimpse course-glimpse--link" href={course.absolute_url}>
    <div className="course-glimpse__media">
      {course.cover_image ? (
        <img
          alt=""
          sizes={course.cover_image.sizes}
          src={course.cover_image.src}
          srcSet={course.cover_image.srcset}
        />
      ) : (
        <div className="course-glimpse__media__empty">
          <FormattedMessage {...messages.cover} />
        </div>
      )}
    </div>
    <div className="course-glimpse__content">
      {course.icon ? (
        <div className="course-glimpse__icon">
          <div className="course-glimpse__band" style={{ background: course.icon.color }}>
            {course.icon.title}
          </div>
          <img src={course.icon.src} srcSet={course.icon.srcset} sizes={course.icon.sizes} alt="" />
        </div>
      ) : null}
      <div className="course-glimpse__wrapper">
        <p className="course-glimpse__title">{course.title}</p>
        <div className="course-glimpse__organization">
          <svg aria-hidden={true} role="img" className="icon">
            <use xlinkHref="#icon-org" />
          </svg>
          <span>{course.organization_highlighted}</span>
        </div>
        <div className="course-glimpse__code">
          <svg aria-hidden={true} role="img" className="icon">
            <use xlinkHref="#icon-barcode" />
          </svg>
          <span>{course.code || '-'}</span>
        </div>
      </div>
      <CourseGlimpseFooter context={context} course={course} />
    </div>
  </a>
);

const areEqual: (
  prevProps: Readonly<CourseGlimpseProps & CommonDataProps>,
  newProps: Readonly<CourseGlimpseProps & CommonDataProps>,
) => boolean = (prevProps, newProps) =>
  prevProps.context === newProps.context && prevProps.course.id === newProps.course.id;

export const CourseGlimpse = React.memo(CourseGlimpseBase, areEqual);
