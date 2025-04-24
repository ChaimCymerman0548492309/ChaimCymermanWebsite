import React, { useState } from "react";
import {
  Calendar as BigCalendar,
  momentLocalizer,
  Views,
  stringOrDate,
} from "react-big-calendar";
import withDragAndDrop, {
  EventInteractionArgs,
} from "react-big-calendar/lib/addons/dragAndDrop";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Box,
  CssBaseline,
  PaletteMode,
  ThemeProvider,
  createTheme,
  useMediaQuery,
  Paper,
  Divider,
  Container,
} from "@mui/material";
import {
  Delete,
  Edit,
  Add,
  Brightness4,
  Brightness7,
  CalendarToday,
  GitHub,
} from "@mui/icons-material";
// import "./Ca.css";
// import DragDropContext from "react-big-calendar/lib/addons/dragAndDrop";

const DragAndDropCalendar = withDragAndDrop<CalendarEvent, object>(BigCalendar);

const localizer = momentLocalizer(moment);

// const DragAndDropCalendar = withDragAndDrop(BigCalendar);

interface CalendarEvent {
  id: number;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
}

const initialEvents: CalendarEvent[] = [
  {
    id: 1,
    title: "Meeting with Team",
    start: new Date(new Date().setHours(10, 0, 0, 0)),
    end: new Date(new Date().setHours(11, 30, 0, 0)),
    color: "#4e79a7",
  },
  {
    id: 2,
    title: "Lunch Break",
    start: new Date(new Date().setHours(12, 0, 0, 0)),
    end: new Date(new Date().setHours(13, 0, 0, 0)),
    color: "#e15759",
  },
  {
    id: 3,
    title: "Project Deadline",
    start: new Date(new Date().setDate(new Date().getDate() + 2)),
    end: new Date(new Date().setDate(new Date().getDate() + 2)),
    allDay: true,
    color: "#59a14f",
  },
];

const colorOptions = [
  "#4e79a7",
  "#f28e2b",
  "#e15759",
  "#76b7b2",
  "#59a14f",
  "#edc948",
  "#b07aa1",
  "#ff9da7",
  "#9c755f",
  "#bab0ac",
];

function App() {
  const prefersDarkMode = useMediaQuery("(prefers-color-scheme: dark)");
  const [mode, setMode] = useState<PaletteMode>(
    prefersDarkMode ? "light" : "dark"
  );
  const [events, setEvents] = useState<CalendarEvent[]>(initialEvents);
  const [currentView, setCurrentView] = useState<string>(Views.MONTH);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({
    title: "",
    start: new Date(),
    end: new Date(new Date().setHours(1, 0, 0, 0)),
    color: colorOptions[0],
  });

  const theme = React.useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          primary: {
            main: mode === "dark" ? "#90caf9" : "#1976d2",
          },
          secondary: {
            main: mode === "dark" ? "#f48fb1" : "#d81b60",
          },
        },
        typography: {
          fontFamily: [
            '"Segoe UI"',
            "Roboto",
            '"Helvetica Neue"',
            "Arial",
            "sans-serif",
          ].join(","),
        },
      }),
    [mode]
  );

  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const onEventDrop = ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...event, start: new Date(start), end: new Date(end) }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const onEventResize = ({
    event,
    start,
    end,
  }: EventInteractionArgs<CalendarEvent>) => {
    const updatedEvents = events.map((existingEvent) =>
      existingEvent.id === event.id
        ? { ...event, start: new Date(start), end: new Date(end) }
        : existingEvent
    );
    setEvents(updatedEvents);
  };

  const handleViewChange = (view: string) => {
    setCurrentView(view);
  };

  const handleDialogOpen = () => {
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(new Date().setHours(1, 0, 0, 0)),
      color: colorOptions[Math.floor(Math.random() * colorOptions.length)],
    });
    setEditingIndex(null);
    setOpenDialog(true);
  };

  const handleDialogClose = () => {
    setOpenDialog(false);
    setNewEvent({
      title: "",
      start: new Date(),
      end: new Date(new Date().setHours(1, 0, 0, 0)),
    });
    setEditingIndex(null);
  };

  const handleSaveEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      if (editingIndex !== null) {
        const updated = [...events];
        updated[editingIndex] = newEvent as CalendarEvent;
        setEvents(updated);
      } else {
        const eventToAdd = {
          ...newEvent,
          id: events.length > 0 ? Math.max(...events.map((e) => e.id)) + 1 : 1,
        } as CalendarEvent;
        setEvents([...events, eventToAdd]);
      }
      handleDialogClose();
    }
  };

  const handleDelete = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const handleEdit = (index: number) => {
    setNewEvent(events[index]);
    setEditingIndex(index);
    setOpenDialog(true);
  };

  const eventStyleGetter = (event: CalendarEvent) => {
    return {
      style: {
        backgroundColor: event.color || "#4e79a7",
        borderRadius: "4px",
        opacity: 0.8,
        color: "#fff",
        border: "0px",
        display: "block",
      },
    };
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          bgcolor: "background.default",
        }}
      >
        {/* Header */}
        <AppBar position="static" elevation={0}>
          <Toolbar>
            <CalendarToday sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Modern Calendar App
            </Typography>
            <IconButton
              color="inherit"
              onClick={toggleColorMode}
              aria-label="toggle theme"
            >
              {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
            <IconButton
              color="inherit"
              href="https://github.com/ChaimCymerman0548492309"
              target="_blank"
              rel="noopener"
              aria-label="GitHub"
            >
              <GitHub />
            </IconButton>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ flex: 1, p: 3 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box
              sx={{
                mb: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="h4" component="h1" sx={{ fontWeight: 700 }}>
                My Schedule
              </Typography>
              <Button
                variant="contained"
                startIcon={<Add />}
                onClick={handleDialogOpen}
                sx={{ textTransform: "none" }}
              >
                New Event
              </Button>
            </Box>

            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: 3,
              }}
            >
              {/* Events List */}
              <Paper
                elevation={3}
                sx={{
                  p: 2,
                  width: { xs: "100%", md: 300 },
                  maxHeight: 500,
                  overflow: "auto",
                }}
              >
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
                  Upcoming Events
                </Typography>
                <Divider sx={{ mb: 2 }} />
                {events.length === 0 ? (
                  <Typography variant="body2" color="text.secondary">
                    No events scheduled
                  </Typography>
                ) : (
                  events
                    .sort((a, b) => a.start.getTime() - b.start.getTime())
                    .map((event, idx) => (
                      <Paper
                        key={event.id}
                        elevation={1}
                        sx={{
                          p: 1.5,
                          mb: 1.5,
                          bgcolor: event.color || "primary.main",
                          color: "#fff",
                          position: "relative",
                        }}
                      >
                        <Typography
                          variant="subtitle2"
                          sx={{ fontWeight: 600 }}
                        >
                          {event.title}
                        </Typography>
                        <Typography variant="caption">
                          {moment(event.start).format("MMM D, YYYY")}
                          {!event.allDay &&
                            ` • ${moment(event.start).format(
                              "h:mm A"
                            )} - ${moment(event.end).format("h:mm A")}`}
                        </Typography>
                        <Box sx={{ position: "absolute", top: 4, right: 4 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleEdit(idx)}
                            sx={{ color: "#fff" }}
                          >
                            <Edit fontSize="small" />
                          </IconButton>
                          <IconButton
                            size="small"
                            onClick={() => handleDelete(event.id)}
                            sx={{ color: "#fff" }}
                          >
                            <Delete fontSize="small" />
                          </IconButton>
                        </Box>
                      </Paper>
                    ))
                )}
              </Paper>

              {/* Calendar */}
              <Box sx={{ flex: 1 }}>
                <DragAndDropCalendar
                  localizer={localizer}
                  events={events}
                  onEventDrop={onEventDrop}
                  onEventResize={onEventResize}
                  resizable
                  showAllEvents
                  showMultiDayTimes
                  style={{ height: 600 }}
                  onView={handleViewChange}
                  className={`rounded-lg shadow-sm ${currentView}`}
                  eventPropGetter={eventStyleGetter}
                  views={[Views.MONTH, Views.WEEK, Views.DAY, Views.AGENDA]}
                  defaultView={Views.MONTH}
                  components={{
                    event: ({ event }) => (
                      <div>
                        <strong>{event.title}</strong>
                        {!event.allDay && (
                          <div>
                            {moment(event.start).format("h:mm A")} -{" "}
                            {moment(event.end).format("h:mm A")}
                          </div>
                        )}
                      </div>
                    ),
                  }}
                />
              </Box>
            </Box>
          </motion.div>

          {/* Event Dialog */}
          <Dialog
            open={openDialog}
            onClose={handleDialogClose}
            fullWidth
            maxWidth="sm"
          >
            <DialogTitle>
              {editingIndex !== null ? "Edit Event" : "Create New Event"}
            </DialogTitle>
            <DialogContent>
              <Box sx={{ mt: 2 }}>
                <TextField
                  fullWidth
                  label="Event Title"
                  margin="normal"
                  variant="outlined"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                />
                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="Start"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={moment(newEvent.start).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        start: new Date(e.target.value),
                      })
                    }
                  />
                  <TextField
                    fullWidth
                    type="datetime-local"
                    label="End"
                    margin="normal"
                    variant="outlined"
                    InputLabelProps={{ shrink: true }}
                    value={moment(newEvent.end).format("YYYY-MM-DDTHH:mm")}
                    onChange={(e) =>
                      setNewEvent({
                        ...newEvent,
                        end: new Date(e.target.value),
                      })
                    }
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle1" sx={{ mb: 1 }}>
                    Event Color
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {colorOptions.map((color) => (
                      <Box
                        key={color}
                        onClick={() => setNewEvent({ ...newEvent, color })}
                        sx={{
                          width: 32,
                          height: 32,
                          bgcolor: color,
                          borderRadius: "50%",
                          cursor: "pointer",
                          border:
                            newEvent.color === color
                              ? `3px solid ${
                                  theme.palette.mode === "dark"
                                    ? "#fff"
                                    : "#000"
                                }`
                              : "none",
                          "&:hover": {
                            transform: "scale(1.1)",
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleDialogClose}>Cancel</Button>
              <Button
                variant="contained"
                onClick={handleSaveEvent}
                disabled={!newEvent.title}
              >
                {editingIndex !== null ? "Save Changes" : "Create Event"}
              </Button>
            </DialogActions>
          </Dialog>
        </Box>

        {/* Footer */}
        <Box
          component="footer"
          sx={{
            py: 3,
            px: 2,
            mt: "auto",
            bgcolor: mode === "dark" ? "background.paper" : "grey.100",
          }}
        >
          <Container maxWidth="lg">
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Modern Calendar App
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Created with React, Material-UI, and React Big Calendar
              </Typography>
              <Box sx={{ display: "flex", gap: 1 }}>
                <IconButton
                  size="small"
                  href="https://github.com/ChaimCymerman0548492309"
                  target="_blank"
                  rel="noopener"
                >
                  <GitHub fontSize="small" />
                </IconButton>
              </Box>
            </Box>
          </Container>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
