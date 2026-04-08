import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface FloatingActionWidgetProps {
    onEnquiry?: () => void;
}

export default function FloatingActionWidget({ onEnquiry }: FloatingActionWidgetProps) {
    const [open, setOpen] = useState(true);
    const navigate = useNavigate();


    const handleApplyNow = () => {
        window.open('https://admissions.dmifoundations.org/dmi-engineering-college-application-form', '_blank');
    };

    const handleEnquiry = () => {
        if (onEnquiry) onEnquiry();
    };

    const actions = [
        {
            label: 'Admissions 2026-27',
            icon: 'ri-file-add-line',
            color: 'bg-sky-600 hover:bg-sky-700 text-white',
            onClick: handleApplyNow,
        },
        {
            label: 'Enquiry Now',
            icon: 'ri-question-answer-line',
            color: 'bg-orange-500 hover:bg-orange-600 text-white',
            onClick: handleEnquiry,
        },
    ];

    return (
        <div className="fixed right-4 bottom-4 md:right-6 md:bottom-6 z-[100] flex flex-col items-end gap-3 font-sans">
            {/* Expanded action buttons */}
            <div
                className={`flex flex-col items-end gap-3 transition-all duration-300 ${open ? 'opacity-100 translate-y-0 pointer-events-auto' : 'opacity-0 translate-y-8 pointer-events-none'
                    }`}
            >
                {actions.map((action) => (
                    <button
                        key={action.label}
                        onClick={action.onClick}
                        className={`flex items-center gap-2.5 px-5 py-3 rounded-full shadow-2xl text-sm font-bold whitespace-nowrap cursor-pointer transition-all duration-200 hover:scale-105 active:scale-95 ${action.color}`}
                    >
                        <i className={`${action.icon} text-lg`}></i>
                        {action.label}
                    </button>
                ))}
            </div>

            {/* Toggle button */}
            <button
                onClick={() => setOpen(!open)}
                title={open ? 'Close' : 'Quick Actions'}
                className={`w-14 h-14 flex items-center justify-center rounded-full shadow-2xl cursor-pointer transition-all duration-300 hover:scale-110 active:scale-90 ${open
                        ? 'bg-slate-800 text-white'
                        : 'bg-[#003366] text-white'
                    }`}
            >
                <i className={`text-2xl transition-transform duration-300 ${open ? 'ri-close-line rotate-90' : 'ri-apps-2-line'}`}></i>
            </button>
        </div>
    );
}