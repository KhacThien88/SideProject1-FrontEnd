import React from 'react';

export type StatusType = 
  | 'pending' | 'processing' | 'completed' | 'failed' | 'cancelled'
  | 'uploaded' | 'processed' | 'archived'
  | 'submitted' | 'in_review' | 'acknowledged' | 'resolved' | 'closed'
  | 'active' | 'inactive' | 'suspended' | 'pending_verification';

export interface StatusDisplayProps {
  status: StatusType;
  customText?: string;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'badge' | 'dot' | 'full';
  showIcon?: boolean;
  className?: string;
}

export const StatusDisplay: React.FC<StatusDisplayProps> = ({
  status,
  customText,
  size = 'md',
  variant = 'badge',
  showIcon = true,
  className = '',
}) => {
  const getStatusConfig = () => {
    const configs = {
      // Processing states
      pending: {
        color: 'orange',
        text: 'Chờ xử lý',
        icon: '⏳',
        bgClass: 'bg-orange-100',
        textClass: 'text-orange-800',
        dotClass: 'bg-orange-500',
      },
      processing: {
        color: 'blue',
        text: 'Đang xử lý',
        icon: '⚙️',
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-800',
        dotClass: 'bg-blue-500',
      },
      completed: {
        color: 'green',
        text: 'Hoàn thành',
        icon: '✅',
        bgClass: 'bg-green-100',
        textClass: 'text-green-800',
        dotClass: 'bg-green-500',
      },
      failed: {
        color: 'red',
        text: 'Thất bại',
        icon: '❌',
        bgClass: 'bg-red-100',
        textClass: 'text-red-800',
        dotClass: 'bg-red-500',
      },
      cancelled: {
        color: 'gray',
        text: 'Đã hủy',
        icon: '🚫',
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-800',
        dotClass: 'bg-gray-500',
      },
      
      // File states
      uploaded: {
        color: 'blue',
        text: 'Đã tải lên',
        icon: '📤',
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-800',
        dotClass: 'bg-blue-500',
      },
      processed: {
        color: 'green',
        text: 'Đã xử lý',
        icon: '✅',
        bgClass: 'bg-green-100',
        textClass: 'text-green-800',
        dotClass: 'bg-green-500',
      },
      archived: {
        color: 'gray',
        text: 'Đã lưu trữ',
        icon: '📁',
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-800',
        dotClass: 'bg-gray-500',
      },
      
      // Feedback states
      submitted: {
        color: 'blue',
        text: 'Đã gửi',
        icon: '📩',
        bgClass: 'bg-blue-100',
        textClass: 'text-blue-800',
        dotClass: 'bg-blue-500',
      },
      in_review: {
        color: 'orange',
        text: 'Đang xem xét',
        icon: '👀',
        bgClass: 'bg-orange-100',
        textClass: 'text-orange-800',
        dotClass: 'bg-orange-500',
      },
      acknowledged: {
        color: 'purple',
        text: 'Đã tiếp nhận',
        icon: '👍',
        bgClass: 'bg-purple-100',
        textClass: 'text-purple-800',
        dotClass: 'bg-purple-500',
      },
      resolved: {
        color: 'green',
        text: 'Đã giải quyết',
        icon: '✅',
        bgClass: 'bg-green-100',
        textClass: 'text-green-800',
        dotClass: 'bg-green-500',
      },
      closed: {
        color: 'gray',
        text: 'Đã đóng',
        icon: '🔒',
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-800',
        dotClass: 'bg-gray-500',
      },
      
      // User states
      active: {
        color: 'green',
        text: 'Hoạt động',
        icon: '🟢',
        bgClass: 'bg-green-100',
        textClass: 'text-green-800',
        dotClass: 'bg-green-500',
      },
      inactive: {
        color: 'gray',
        text: 'Không hoạt động',
        icon: '⚪',
        bgClass: 'bg-gray-100',
        textClass: 'text-gray-800',
        dotClass: 'bg-gray-500',
      },
      suspended: {
        color: 'red',
        text: 'Tạm khóa',
        icon: '🔴',
        bgClass: 'bg-red-100',
        textClass: 'text-red-800',
        dotClass: 'bg-red-500',
      },
      pending_verification: {
        color: 'orange',
        text: 'Chờ xác thực',
        icon: '🟡',
        bgClass: 'bg-orange-100',
        textClass: 'text-orange-800',
        dotClass: 'bg-orange-500',
      },
    };

    return configs[status] || configs.pending;
  };

  const getSizeClasses = () => {
    const sizes = {
      sm: {
        badge: 'px-2 py-1 text-xs',
        dot: 'w-2 h-2',
        full: 'px-2 py-1 text-xs',
      },
      md: {
        badge: 'px-2.5 py-1.5 text-sm',
        dot: 'w-3 h-3',
        full: 'px-3 py-2 text-sm',
      },
      lg: {
        badge: 'px-3 py-2 text-base',
        dot: 'w-4 h-4',
        full: 'px-4 py-3 text-base',
      },
    };

    return sizes[size];
  };

  const config = getStatusConfig();
  const sizeClasses = getSizeClasses();
  const displayText = customText || config.text;

  if (variant === 'dot') {
    return (
      <div className={`flex items-center space-x-2 ${className}`}>
        <div className={`${sizeClasses.dot} rounded-full ${config.dotClass}`} />
        <span className={`${sizeClasses.full.split(' ').pop()} text-gray-700`}>
          {displayText}
        </span>
      </div>
    );
  }

  if (variant === 'full') {
    return (
      <div className={`
        inline-flex items-center space-x-2 ${sizeClasses.full} 
        ${config.bgClass} ${config.textClass} rounded-lg font-medium ${className}
      `}>
        {showIcon && <span>{config.icon}</span>}
        <span>{displayText}</span>
      </div>
    );
  }

  // Default badge variant
  return (
    <span className={`
      inline-flex items-center ${sizeClasses.badge} 
      ${config.bgClass} ${config.textClass} rounded-full font-medium ${className}
    `}>
      {showIcon && <span className="mr-1">{config.icon}</span>}
      {displayText}
    </span>
  );
};

// Animated status for processing states
export const AnimatedStatus: React.FC<Omit<StatusDisplayProps, 'variant'>> = (props) => {
  const isProcessing = ['processing', 'pending', 'in_review'].includes(props.status);
  
  return (
    <div className={`inline-flex items-center ${isProcessing ? 'animate-pulse' : ''}`}>
      <StatusDisplay {...props} variant="full" />
    </div>
  );
};

// Status with tooltip for additional information
export const StatusWithTooltip: React.FC<StatusDisplayProps & {
  tooltip?: string;
  timestamp?: string;
}> = ({ tooltip, timestamp, ...props }) => {
  const [showTooltip, setShowTooltip] = React.useState(false);

  return (
    <div className="relative inline-block">
      <div
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
      >
        <StatusDisplay {...props} />
      </div>
      
      {(tooltip || timestamp) && showTooltip && (
        <div className="absolute z-10 px-2 py-1 text-xs text-white bg-gray-900 rounded shadow-lg -top-8 left-1/2 transform -translate-x-1/2 whitespace-nowrap">
          {tooltip && <div>{tooltip}</div>}
          {timestamp && (
            <div className="text-gray-300">
              {new Date(timestamp).toLocaleString('vi-VN')}
            </div>
          )}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900" />
        </div>
      )}
    </div>
  );
};

export default StatusDisplay;
