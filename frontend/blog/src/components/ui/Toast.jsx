import React, { useEffect, useState } from 'react';
import { X, CheckCircle, AlertCircle, Info } from 'lucide-react';

const Toast = ({ id, message, type = 'info', onClose, duration = 3000 }) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            handleClose();
        }, duration);

        return () => clearTimeout(timer);
    }, [duration]);

    const handleClose = () => {
        setIsExiting(true);
        setTimeout(() => {
            onClose(id);
        }, 400); // Wait for exit animation
    };

    const getIcon = () => {
        switch (type) {
            case 'success':
                return <CheckCircle size={20} className="text-green-400" />;
            case 'error':
                return <AlertCircle size={20} className="text-red-400" />;
            case 'info':
            default:
                return <Info size={20} className="text-blue-400" />;
        }
    };

    const getBorderColor = () => {
        switch (type) {
            case 'success': return 'border-green-500/50';
            case 'error': return 'border-red-500/50';
            default: return 'border-blue-500/50';
        }
    };

    return (
        <div
            className={`
        flex items-center gap-3 p-4 mb-3 rounded-lg shadow-lg border backdrop-blur-md
        transition-all duration-400 ease-in-out
        ${isExiting ? 'opacity-0 translate-x-full' : 'opacity-100 translate-x-0'}
        ${getBorderColor()}
      `}
            style={{
                background: 'var(--toast-bg)',
                color: 'var(--text-primary)',
                minWidth: '300px',
                maxWidth: '400px',
                animation: 'slideIn 0.3s ease-out'
            }}
        >
            <div className="flex-shrink-0">
                {getIcon()}
            </div>
            <div className="flex-1 text-sm font-medium">
                {message}
            </div>
            <button
                onClick={handleClose}
                className="p-1 rounded-full hover:bg-white/10 transition-colors"
            >
                <X size={16} className="text-gray-400" />
            </button>

            <style>{`
        @keyframes slideIn {
          from { transform: translateX(100%); opacity: 0; }
          to { transform: translateX(0); opacity: 1; }
        }
      `}</style>
        </div>
    );
};

export default Toast;
