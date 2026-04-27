"use client";

import { useState, useRef, useEffect } from "react";
import { EllipsisVertical, Info, ExternalLink, BookOpen } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { CourseDetailsModal } from "./CourseDetailsModal";

export function CourseItem({ course }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const menuRef = useRef(null);

  const titleLabel = course.code
    ? `${course.title} - (${course.code})`
    : course.title;

  const actionLabel = course.code
    ? `Open actions for ${course.code}`
    : `Open actions for ${course.title}`;

  useEffect(() => {
    function handleClickOutside(event) {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setIsMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <article className="border-b border-gray-200 px-2 py-4 transition-colors duration-200 hover:bg-gray-50 dark:border-gray-700 dark:hover:bg-gray-800/60">
        <div className="flex items-center justify-between gap-4 max-sm:flex-col max-sm:items-start">
          <div className="flex min-w-0 flex-1 items-center gap-4 max-sm:w-full max-sm:items-start">
            <div className="relative h-20 w-32 shrink-0 overflow-hidden rounded-md max-sm:h-16 max-sm:w-24">
              <Image
                src={course.image}
                alt={`${course.title} thumbnail`}
                fill
                sizes="(max-width: 640px) 96px, 128px"
                className="object-cover"
              />
            </div>

            <div className="min-w-0">
              <Link
                href={`/dashboard/courses?course=${course.id}`}
                className="line-clamp-2 text-lg font-medium text-blue-600 transition-colors duration-300 hover:underline dark:text-blue-300"
              >
                {titleLabel}
              </Link>
              <p className="text-sm text-gray-500 transition-colors duration-300 dark:text-gray-400">
                {course.department}
              </p>
            </div>
          </div>

          <div className="relative" ref={menuRef}>
            <button
              type="button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-gray-500 transition-all hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-200 max-sm:self-end ${isMenuOpen ? 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-gray-100' : ''}`}
              aria-label={actionLabel}
              aria-expanded={isMenuOpen}
            >
              <EllipsisVertical className="h-5 w-5" />
            </button>

            {isMenuOpen && (
              <div className="absolute right-0 top-full z-50 mt-1 w-48 origin-top-right rounded-xl border border-gray-200 bg-white p-1 shadow-xl ring-1 ring-black/5 transition-all dark:border-gray-700 dark:bg-gray-800">
                <button
                  onClick={() => {
                    setIsModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  <Info className="h-4 w-4" />
                  View Details
                </button>
                <Link
                  href={`/dashboard/courses?course=${course.id}`}
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  <BookOpen className="h-4 w-4" />
                  Course Content
                </Link>
                <button
                  className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm font-medium text-gray-700 transition-colors hover:bg-blue-50 hover:text-blue-600 dark:text-gray-300 dark:hover:bg-blue-900/30 dark:hover:text-blue-300"
                >
                  <ExternalLink className="h-4 w-4" />
                  LMS Link
                </button>
              </div>
            )}
          </div>
        </div>
      </article>

      <CourseDetailsModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        course={course}
      />
    </>
  );
}
