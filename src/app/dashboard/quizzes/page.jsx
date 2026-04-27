import { QuizCard } from "@/components/student-dashboard/quizzes/QuizCard";
import { QuizTable } from "@/components/student-dashboard/quizzes/QuizTable";
import { SummaryCard } from "@/components/student-dashboard/quizzes/SummaryCard";

import { getAllQuizzes } from "@/lib/local-db";

export const dynamic = "force-dynamic";

const QUIZZES = getAllQuizzes();

const UPCOMING_STATUSES = new Set(["Upcoming", "Ongoing"]);
const HISTORY_STATUSES = new Set(["Completed", "Missed"]);

function formatDate(dateString) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(dateString));
}

function formatTime(time24Hour) {
  return new Intl.DateTimeFormat("en-US", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`1970-01-01T${time24Hour}:00`));
}

function parseScore(score) {
  if (!score || !score.includes("/")) {
    return null;
  }

  const [earnedRaw, totalRaw] = score.split("/");
  const earned = Number(earnedRaw);
  const total = Number(totalRaw);

  if (!Number.isFinite(earned) || !Number.isFinite(total) || total <= 0) {
    return null;
  }

  return {
    earned,
    total,
    percentage: (earned / total) * 100,
  };
}

function getQuizDateTime(quiz) {
  return new Date(`${quiz.date}T${quiz.time}:00`);
}

function formatCountdown(dateTime, now) {
  const diffMs = dateTime.getTime() - now.getTime();

  if (diffMs <= 0) {
    return "Live now";
  }

  const totalMinutes = Math.floor(diffMs / 60000);
  const days = Math.floor(totalMinutes / (60 * 24));
  const hours = Math.floor((totalMinutes % (60 * 24)) / 60);
  const minutes = totalMinutes % 60;

  if (days > 0) {
    return `${days}d ${hours}h ${minutes}m`;
  }

  if (hours > 0) {
    return `${hours}h ${minutes}m`;
  }

  return `${minutes}m`;
}

import { HeroAssessmentCard } from "@/components/student-dashboard/HeroAssessmentCard";

export default function QuizzesPage() {
  const now = new Date();

  const quizzes = QUIZZES.map((quiz) => {
    const scoreData = parseScore(quiz.score);
    const dateTime = getQuizDateTime(quiz);

    return {
      ...quiz,
      dateTime,
      dateLabel: formatDate(quiz.date),
      timeLabel: formatTime(quiz.time),
      percentage: scoreData ? Math.round(scoreData.percentage) : null,
      percentageLabel: scoreData ? `${Math.round(scoreData.percentage)}%` : "--",
    };
  }).sort((leftQuiz, rightQuiz) => leftQuiz.dateTime - rightQuiz.dateTime);

  const upcomingQuizzes = quizzes.filter((quiz) => UPCOMING_STATUSES.has(quiz.status));
  const historyQuizzes = quizzes
    .filter((quiz) => HISTORY_STATUSES.has(quiz.status))
    .sort((leftQuiz, rightQuiz) => rightQuiz.dateTime - leftQuiz.dateTime);

  const scoredQuizzes = historyQuizzes.filter((quiz) => quiz.percentage !== null);
  const averageScore =
    scoredQuizzes.length > 0
      ? `${Math.round(
          scoredQuizzes.reduce(
            (runningTotal, quiz) => runningTotal + (quiz.percentage ?? 0),
            0,
          ) / scoredQuizzes.length,
        )}%`
      : "--";

  const ongoingQuiz = upcomingQuizzes.find((quiz) => quiz.status === "Ongoing");
  const nextUpcomingQuiz = upcomingQuizzes.find(
    (quiz) => quiz.dateTime.getTime() > now.getTime(),
  );

  const nextQuizCountdown = ongoingQuiz
    ? "Live now"
    : nextUpcomingQuiz
      ? formatCountdown(nextUpcomingQuiz.dateTime, now)
      : "No upcoming quiz";

  const nextQuizDescription = ongoingQuiz
    ? `${ongoingQuiz.course} is currently in progress`
    : nextUpcomingQuiz
      ? `${nextUpcomingQuiz.course} - ${nextUpcomingQuiz.title}`
      : "All listed quizzes are completed";

  const summaryCards = [
    {
      id: "total",
      title: "Total Quizzes",
      value: String(quizzes.length),
      helperText: "All scheduled quizzes",
    },
    {
      id: "upcoming",
      title: "Upcoming Quizzes",
      value: String(upcomingQuizzes.length),
      helperText: "Upcoming and ongoing assessments",
    },
    {
      id: "average",
      title: "Average Score",
      value: averageScore,
      helperText: "Based on completed quiz results",
    },
  ];

  return (
    <div className="space-y-8 px-4 sm:px-0">
      <header>
        <h1 className="text-2xl font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Quizzes
        </h1>
        <p className="mt-2 text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
          Track upcoming quizzes, review your results, and monitor overall performance.
        </p>
      </header>

      <HeroAssessmentCard type="Quiz" assessments={quizzes} />

      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {summaryCards.map((card) => (
          <SummaryCard
            key={card.id}
            title={card.title}
            value={card.value}
            helperText={card.helperText}
          />
        ))}
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Upcoming Quizzes
        </h2>
        <div className="mt-4 grid grid-cols-1 gap-4">
          {upcomingQuizzes.length > 0 ? (
            upcomingQuizzes.map((quiz) => <QuizCard key={quiz.id} quiz={quiz} />)
          ) : (
            <article className="rounded-xl border border-dashed border-gray-300 p-4 text-sm text-gray-600 dark:border-gray-700 dark:text-gray-300">
              No upcoming quizzes right now.
            </article>
          )}
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold text-gray-900 transition-colors duration-300 dark:text-gray-100">
          Quiz History
        </h2>
        <div className="mt-4 rounded-2xl bg-white p-5 shadow-sm transition-colors duration-300 dark:bg-gray-800">
          {historyQuizzes.length > 0 ? (
            <QuizTable items={historyQuizzes} />
          ) : (
            <p className="text-sm text-gray-600 transition-colors duration-300 dark:text-gray-300">
              Completed quizzes will appear here once results are published.
            </p>
          )}
        </div>
      </section>
    </div>
  );
}