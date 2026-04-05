// components/StatsCard.tsx
interface StatsCardProps {
    title: string;
    value: string | number;
    icon: React.ReactNode;
    color: string;
}

export default function StatsCard({ title, value, icon, color }: StatsCardProps) {
    return (
        <div className="bg-white dark:bg-gray-800 p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${color}`}>
                    {icon}
                </div>
                <div>
                    <p className="text-4xl font-semibold">{value}</p>
                    <p className="text-gray-500 dark:text-gray-400">{title}</p>
                </div>
            </div>
        </div>
    );
}