import Link from "next/link";
import prisma from "@/lib/prisma";
import { FolderKanban, MessageSquare, Eye, EyeOff } from "lucide-react";
import { formatDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [projectCount, messageCount, unreadCount, recentMessages] =
    await Promise.all([
      prisma.project.count(),
      prisma.message.count(),
      prisma.message.count({ where: { read: false } }),
      prisma.message.findMany({
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
    ]);

  const stats = [
    {
      label: "Projects",
      value: projectCount,
      icon: FolderKanban,
      href: "/admin/projects",
      color: "#E8536A",
    },
    {
      label: "Messages",
      value: messageCount,
      icon: MessageSquare,
      href: "/admin/messages",
      color: "#D4A853",
    },
    {
      label: "Unread",
      value: unreadCount,
      icon: unreadCount > 0 ? EyeOff : Eye,
      href: "/admin/messages",
      color: "#FF7B8A",
    },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold font-heading text-text-primary mb-1">
        Dashboard
      </h1>
      <p className="text-text-secondary text-sm mb-8">
        Overview of your portfolio content
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
        {stats.map((stat) => (
          <Link
            key={stat.label}
            href={stat.href}
            className="bg-surface border border-border-custom rounded-xl p-5 hover:border-accent-primary/30 transition-colors"
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm text-text-secondary">{stat.label}</span>
              <stat.icon className="w-5 h-5" style={{ color: stat.color }} />
            </div>
            <p className="text-3xl font-bold font-heading text-text-primary">
              {stat.value}
            </p>
          </Link>
        ))}
      </div>

      <div className="bg-surface border border-border-custom rounded-xl p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="font-semibold font-heading text-text-primary">
            Recent Messages
          </h2>
          <Link
            href="/admin/messages"
            className="text-sm text-accent-primary hover:underline"
          >
            View all
          </Link>
        </div>

        {recentMessages.length === 0 ? (
          <p className="text-text-secondary text-sm py-4">No messages yet</p>
        ) : (
          <div className="space-y-3">
            {recentMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start justify-between gap-4 p-3 rounded-lg ${
                  msg.read ? "bg-surface-elevated/50" : "bg-accent-primary/5"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    {!msg.read && (
                      <span className="w-2 h-2 rounded-full bg-accent-primary shrink-0" />
                    )}
                    <p className="font-medium text-text-primary text-sm truncate">
                      {msg.name}
                    </p>
                    <span className="text-xs text-text-secondary truncate">
                      {msg.subject}
                    </span>
                  </div>
                  <p className="text-xs text-text-secondary mt-1 truncate">
                    {msg.message}
                  </p>
                </div>
                <span className="text-xs text-text-secondary shrink-0">
                  {formatDate(msg.createdAt)}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
