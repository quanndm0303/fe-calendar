import React, { useState, useEffect } from "react";
import {
  format,
  addMonths,
  subMonths,
  startOfWeek,
  endOfWeek,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  parseISO,
  addDays,
  subDays,
  getDaysInMonth,
  getYear,
  setYear,
  getMonth,
  setMonth,
  setHours,
} from "date-fns";
import "./Calendar.css";
import { fetchEvents } from "../../services/api";
import { Dropdown } from "bootstrap";
import { DropdownButton } from "react-bootstrap";
import Header from "../Header";
import { AppBar, Box, IconButton, Toolbar } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useTheme } from "@mui/material";

const Calendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState([]);
  const [view, setView] = useState("month"); // 'month', 'week', 'day', 'year'
 const [mobileOpen, setMobileOpen] = React.useState(false);
 const [isClosing, setIsClosing] = React.useState(false);
const handleDrawerToggle = () => {
  if (!isClosing) {
    setMobileOpen(!mobileOpen);
  }
};
  
  useEffect(() => {
    const getEvents = async () => {
      const fetchedEvents = await fetchEvents(currentDate);
      setEvents(fetchedEvents);
    };
    getEvents();
  }, [currentDate]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

const theme = useTheme();

  const onDateClick = (day) => {
    setCurrentDate(day);
    setView("day");
  };

  const nextPeriod = () => {
    switch (view) {
      case "month":
        setCurrentDate(addMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(addDays(currentDate, 7));
        break;
      case "day":
        setCurrentDate(addDays(currentDate, 1));
        break;
      case "year":
        setCurrentDate(setYear(currentDate, getYear(currentDate) + 1));
        break;
    }
  };

  const prevPeriod = () => {
    switch (view) {
      case "month":
        setCurrentDate(subMonths(currentDate, 1));
        break;
      case "week":
        setCurrentDate(subDays(currentDate, 7));
        break;
      case "day":
        setCurrentDate(subDays(currentDate, 1));
        break;
      case "year":
        setCurrentDate(setYear(currentDate, getYear(currentDate) - 1));
        break;
    }
  };

  const renderHeader = () => {
    let dateFormat;
    switch (view) {
      case "month":
        dateFormat = "MMMM yyyy";
        break;
      case "week":
        dateFormat = "MMMM d yyyy";
        break;
      case "day":
        dateFormat = "MMMM d, yyyy";
        break;
      case "year":
        dateFormat = "yyyy";
        break;
    }

    return (
      <div className="header row">
        <div className="col col-start">
          <div className="icon" onClick={prevPeriod}>
            &#8592;
          </div>
        </div>
        <div className="col col-center">
          <span>{format(currentDate, dateFormat)}</span>
        </div>
        <div className="col col-end" onClick={nextPeriod}>
          <div className="icon">&#8594;</div>
        </div>
        <div className="view-options">
          <button
            className={view === "day" ? "active" : ""}
            onClick={() => setView("day")}
          >
            Day
          </button>
          <button
            className={view === "week" ? "active" : ""}
            onClick={() => setView("week")}
          >
            Week
          </button>
          <button
            className={view === "month" ? "active" : ""}
            onClick={() => setView("month")}
          >
            Month
          </button>
          <button
            className={view === "year" ? "active" : ""}
            onClick={() => setView("year")}
          >
            Year
          </button>
        </div>
      </div>
    );
  };


  const renderDays = () => {
    const dateFormat = "EEEEEE";
    const days = [];
    let startDate = startOfWeek(currentDate);

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className="col col-center" key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className="days row">{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const rows = [];

    let days = eachDayOfInterval({
      start: startDate,
      end: endDate,
    });

    let formattedDays = days.map((day) => {
      return (
        <div
          className={`col cell ${
            !isSameMonth(day, monthStart)
              ? "disabled"
              : isSameDay(day, new Date())
              ? "selected"
              : ""
          }`}
          key={day.toString()}
          onClick={() => onDateClick(day)}
        >
          <span className="number">{format(day, dateFormat)}</span>
          {renderEvents(day)}
        </div>
      );
    });

    while (formattedDays.length) {
      rows.push(
        <div
          className="row"
          key={formattedDays[0]?.props?.key || `row-${rows.length}`}
        >
          {formattedDays.splice(0, 7)}
        </div>
      );
    }

    return <div className="body">{rows}</div>;
  };

  const renderEvents = (day) => {
    const dayEvents = events.filter((event) =>
      isSameDay(parseISO(event.start.dateTime), day)
    );
    return dayEvents.map((event) => (
      <div key={event.id} className="event">
        {event.summary}
      </div>
    ));
  };

  const renderMiniCalendar = () => {
    const days = getDaysInMonth(currentDate);
    const miniDays = [];

    for (let i = 1; i <= days; i++) {
      miniDays.push(
        <div
          key={i}
          className={`mini-day ${i === currentDate.getDate() ? "current" : ""}`}
          onClick={() =>
            setCurrentDate(
              new Date(currentDate.getFullYear(), currentDate.getMonth(), i)
            )
          }
        >
          {i}
        </div>
      );
    }

    return (
      <div className="mini-calendar">
        <h4>{format(currentDate, "MMMM yyyy")}</h4>
        <div className="mini-days">{miniDays}</div>
      </div>
    );
  };

  const renderDayView = () => {
    const hours = Array.from({ length: 24 }, (_, i) => i);

    return (
      <div className="day-view">
        {hours.map((hour) => (
          <div key={hour} className="hour-slot">
            <div className="hour-label">{`${hour}:00`}</div>
            <div className="hour-events">
              {renderEvents(setHours(currentDate, hour))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  const renderWeekView = () => {
    const startOfTheWeek = startOfWeek(currentDate);
    const endOfTheWeek = endOfWeek(currentDate);
    const days = eachDayOfInterval({
      start: startOfTheWeek,
      end: endOfTheWeek,
    });

    return (
      <div className="week-view">
        {days.map((day) => (
          <div key={day.toString()} className="day-column">
            <div className="day-header">{format(day, "EEE d")}</div>
            <div className="day-content">{renderEvents(day)}</div>
          </div>
        ))}
      </div>
    );
  };

  const renderYearView = () => {
    const months = Array.from({ length: 12 }, (_, i) => i);

    return (
      <div className="year-view">
        {months.map((month) => {
          const firstDayOfMonth = new Date(currentDate.getFullYear(), month, 1);
          return (
            <div
              key={month}
              className="month-cell"
              onClick={() => {
                setCurrentDate(firstDayOfMonth);
                setView("month");
              }}
            >
              <div className="month-name">{format(firstDayOfMonth, "MMM")}</div>
              <div className="month-days">
                {renderMiniMonth(firstDayOfMonth)}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const renderMiniMonth = (date) => {
    const days = getDaysInMonth(date);
    const miniDays = [];

    for (let i = 1; i <= days; i++) {
      miniDays.push(
        <div key={i} className="mini-day">
          {i}
        </div>
      );
    }

    return <div className="mini-month">{miniDays}</div>;
  };

  const renderContent = () => {
    switch (view) {
      case "month":
        return (
          <>
            {renderDays()}
            {renderCells()}
          </>
        );
      case "week":
        return renderWeekView();
      case "day":
        return renderDayView();
      case "year":
        return renderYearView();
      default:
        return null;
    }
  };

  const drawerWidth = 300;

  return (
    <>
      <div>
        <AppBar
          position="fixed"
          sx={{
            ml: { sm: `${drawerWidth}px` },
            zIndex: theme.zIndex.drawer + 1,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Header />
          </Toolbar>
        </AppBar>
      </div>
      <div style={{ marginTop: theme.mixins.toolbar.minHeight }}>
        <div className="calendar-container">
          {renderMiniCalendar()}
          <div className="calendar">
            {renderHeader()}
            {renderContent()}
          </div>
        </div>
      </div>
    </>
  );
};

export default Calendar;
