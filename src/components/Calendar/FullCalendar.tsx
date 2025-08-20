import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import './FullCalendar.css';
import styled from '@emotion/styled';

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

export const FullCalendar = () => {
  const [value, onChange] = useState<Value>(new Date());

  return (
    <CalendarContainer>
      <Calendar 
        onChange={onChange} 
        view="month"
        minDetail="month"
        showNavigation={false}
        locale='ko-KR'
        calendarType='gregory'
        />
    </CalendarContainer>
  );
};

const CalendarContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;