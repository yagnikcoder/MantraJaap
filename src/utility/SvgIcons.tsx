import React from 'react';
import Svg, { Path, SvgProps } from 'react-native-svg';

interface HistoryIconProps extends SvgProps {
  size?: number | string;
  color?: string;
}

interface CalendarGiftIconProps extends SvgProps {
  size?: number | string;
  color?: string;
}

interface BackArrowIconProps extends SvgProps {
  size?: number | string;
  color?: string;
}

interface BirthdayCalendarIconProps extends SvgProps {
  size?: number | string;
  color?: string;
}

interface BackArrowIconProps extends SvgProps {
  size?: number | string;
  color?: string;
}

export const HistoryIcon: React.FC<HistoryIconProps> = ({
  size = 20,
  color = '#000000',
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <Path
        d="M1.5 1.25a.75.75 0 011.5 0v1.851A7 7 0 111 8a.75.75 0 011.5 0 5.5 5.5 0 101.725-4H5.75a.75.75 0 010 1.5h-3.5a.75.75 0 01-.75-.75v-3.5z"
        fill={color}
      />
      <Path
        d="M8.25 4a.75.75 0 01.75.75v3.763l1.805.802a.75.75 0 01-.61 1.37l-2.25-1A.75.75 0 017.5 9V4.75A.75.75 0 018.25 4z"
        fill={color}
      />
    </Svg>
  );
};

export const BirthdayCalendarIcon: React.FC<BirthdayCalendarIconProps> = ({
  size = 24,
  color = '#000000',
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill={color}
      {...props}
    >
      <Path d="M16,8.53h0a.93.93,0,1,1,.94-.93A.93.93,0,0,1,16,8.53Z" />
      <Path d="M17.85,26.27H4.79a.93.93,0,0,1-.93-.93V6.67a.93.93,0,0,1,.93-.93h22.4a.93.93,0,0,1,.93.93v2.8H6.66a.93.93,0,0,0,0,1.87H28.13V16A.93.93,0,0,0,30,16V6.67a2.8,2.8,0,0,0-2.8-2.8H4.79A2.8,2.8,0,0,0,2,6.67V25.33a2.8,2.8,0,0,0,2.8,2.8H17.85a.93.93,0,0,0,0-1.87Z" />
      <Path d="M29.07,20.66H27.59l.27-.27a.93.93,0,0,0-1.32-1.32l-1.21,1.21-1.2-1.2A.93.93,0,0,0,22.8,20.4l.27.27H21.61a.93.93,0,0,0-.93.93v5.6a.93.93,0,0,0,.93.93h7.47A.93.93,0,0,0,30,27.2V21.6A.93.93,0,0,0,29.07,20.66Zm-6.53,1.87h1.85v3.73H22.54Zm5.6,3.73H26.26V22.53h1.88Z" />
      <Path d="M11.33,13.19a.93.93,0,0,0-.93-.93H6.66a.93.93,0,0,0-.93.93v3.73a.93.93,0,0,0,.93.93H10.4a.93.93,0,0,0,.93-.93ZM9.46,16H7.6V14.13H9.46Z" />
      <Path d="M10.4,18.8H6.66a.93.93,0,0,0-.93.93v3.73a.93.93,0,0,0,.93.93H10.4a.93.93,0,0,0,.93-.93V19.73A.93.93,0,0,0,10.4,18.8Zm-.93,3.73H7.6V20.66H9.46Z" />
      <Path d="M17.87,12.26H14.13a.93.93,0,0,0-.93.93v3.73a.93.93,0,0,0,.93.93h3.73a.93.93,0,0,0,.93-.93V13.19A.93.93,0,0,0,17.87,12.26ZM16.93,16H15.07V14.13h1.87Z" />
      <Path d="M21.6,16.93a.93.93,0,0,0,.93-.93V14.13H24.4V16a.93.93,0,0,0,1.87,0v-2.8a.93.93,0,0,0-.93-.93H21.6a.93.93,0,0,0-.93.93V16A.93.93,0,0,0,21.6,16.93Z" />
      <Path d="M17.87,18.8H14.13a.93.93,0,0,0-.93.93v3.73a.93.93,0,0,0,.93.93h3.73a.93.93,0,0,0,.93-.93V19.73A.93.93,0,0,0,17.87,18.8Zm-.93,3.73H15.07V20.66h1.87Z" />
    </Svg>
  );
};

export const BackArrowIcon: React.FC<BackArrowIconProps> = ({
  size = 24,
  color = '#000000',
  ...props
}) => {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <Path
        d="M13.83 19a1 1 0 0 1-.78-.37l-4.83-6a1 1 0 0 1 0-1.27l5-6a1 1 0 0 1 1.54 1.28L10.29 12l4.32 5.36a1 1 0 0 1-.78 1.64z"
        fill={color}
      />
    </Svg>
  );
};
