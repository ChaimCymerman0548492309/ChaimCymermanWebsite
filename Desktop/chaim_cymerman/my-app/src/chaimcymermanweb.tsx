import {
  Email,
  Phone,
  GitHub,
  LinkedIn,
  Launch,
  Code,
  School,
  Work,
  Star,
  Terminal,
  DesignServices,
  Psychology,
  Groups,
  MilitaryTech,
} from "@mui/icons-material";
import {
  Box,
  Typography,
  Link,
  Divider,
  List,
  ListItem,
  ListItemText,
  Paper,
  Chip,
  Stack,
  Grid,
  Avatar,
  IconButton,
  useTheme,
  Button,
  TextField,
} from "@mui/material";
import { motion, useAnimation, AnimatePresence } from "framer-motion";
import Particles from "react-tsparticles";
import { loadFull } from "tsparticles";
import { useCallback } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EmojiEmotions } from "@mui/icons-material";

// נתוני פרויקטים
const projects = [
  {
    title: "Student Management Dashboard",
    desc: "A modern dashboard to track attendance, grades, and reports built with React, Node.js & Jotai.",
    link: "https://github.com/ChaimCymerman0548492309/student-dashboard",
    tech: ["React", "Node.js", "MongoDB", "Jotai"],
    image: "https://source.unsplash.com/random/600x400/?dashboard",
  },
  {
    title: "Task Drag-and-Drop System",
    desc: "Custom Kanban system with multi-item drag-and-drop and dynamic boards. Built in React.",
    link: "https://github.com/ChaimCymerman0548492309/task-dnd",
    tech: ["React", "DnD", "Tailwind", "Firebase"],
    image: "https://source.unsplash.com/random/600x400/?kanban",
  },
  {
    title: "Military Operations Tracker",
    desc: "Secure system for tracking military operations with real-time updates.",
    link: "#",
    tech: ["Angular", "NestJS", "PostgreSQL", "Docker"],
    image: "https://source.unsplash.com/random/600x400/?military",
  },
];

// נתוני כישורים
const skills = [
  {
    name: "Frontend",
    items: ["React", "Angular", "TypeScript", "Redux", "MUI"],
  },
  { name: "Backend", items: ["Node.js", "NestJS", "GraphQL", "REST API"] },
  { name: "Databases", items: ["MongoDB", "PostgreSQL", "Firebase"] },
  { name: "DevOps", items: ["Docker", "CI/CD", "AWS", "Git"] },
  { name: "Testing", items: ["Jest", "Cypress", "Testing Library"] },
];

export default function ChaimCymermanWebsite() {
  const theme = useTheme();
  const controls = useAnimation();

  const particlesInit = useCallback(async (engine: any) => {
    await loadFull(engine);
  }, []);

  const particlesLoaded = useCallback(async (container : any) => {
    await console.log(container);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        minHeight: "100vh",
        bgcolor: "background.default",
      }}
    >
      {/* אנימציית חלקיקים ברקע */}
      <Particles
        id="tsparticles"
        init={particlesInit}
        loaded={particlesLoaded}
        options={{
          fullScreen: { enable: false, zIndex: 0 },
          background: {
            color: {
              value: theme.palette.background.default,
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: theme.palette.primary.main,
            },
            links: {
              color: theme.palette.secondary.main,
              distance: 150,
              enable: true,
              opacity: 0.5,
              width: 1,
            },
            move: {
              direction: "none",
              enable: true,
              outModes: {
                default: "bounce",
              },
              random: false,
              speed: 2,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.5,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 5 },
            },
          },
          detectRetina: true,
        }}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
        }}
      />

      {/* תוכן האתר */}
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          p: { xs: 2, md: 4 },
          maxWidth: 1200,
          mx: "auto",
          backdropFilter: "blur(4px)",
        }}
      >
        {/* סעיף ראשי */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
        >
          <Box
            textAlign="center"
            mb={6}
            sx={{
              py: 6,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              borderRadius: 4,
              color: "white",
              boxShadow: 6,
            }}
          >
            <motion.div
              animate={{
                scale: [1, 1.05, 1],
                rotate: [0, 5, -5, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            >
              <Avatar
                src="https://source.unsplash.com/random/300x300/?portrait"
                sx={{
                  width: 120,
                  height: 120,
                  mx: "auto",
                  mb: 3,
                  border: "4px solid white",
                }}
              />
            </motion.div>
            <Typography
              variant="h2"
              fontWeight="bold"
              gutterBottom
              sx={{
                background: "linear-gradient(45deg, #fff, #ddd)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Hi, I'm Chaim 👋
            </Typography>
            <Typography variant="h5" gutterBottom>
              Full-Stack Developer & Team Leader
            </Typography>
            <Typography variant="subtitle1" mb={4}>
              Building modern web experiences with cutting-edge technologies
            </Typography>

            <Stack
              direction="row"
              justifyContent="center"
              spacing={3}
              mt={2}
              sx={{ flexWrap: "wrap", gap: 2 }}
            >
              {[
                {
                  icon: <Email sx={{ mr: 0.5 }} />,
                  text: "Email",
                  href: "mailto:chaimcymerman0548492309@gmail.com",
                },
                {
                  icon: <Phone sx={{ mr: 0.5 }} />,
                  text: "Phone",
                  href: "tel:+972548492309",
                },
                {
                  icon: <LinkedIn sx={{ mr: 0.5 }} />,
                  text: "LinkedIn",
                  href: "https://linkedin.com/in/chaim-cymerman-94961423a",
                },
                {
                  icon: <GitHub sx={{ mr: 0.5 }} />,
                  text: "GitHub",
                  href: "https://github.com/ChaimCymerman0548492309",
                },
              ].map((item) => (
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  key={item.text}
                >
                  <Link
                    href={item.href}
                    target="_blank"
                    color="inherit"
                    underline="hover"
                    display="flex"
                    alignItems="center"
                    sx={{
                      px: 2,
                      py: 1,
                      bgcolor: "rgba(255,255,255,0.1)",
                      borderRadius: 2,
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.2)",
                      },
                    }}
                  >
                    {item.icon} {item.text}
                  </Link>
                </motion.div>
              ))}
            </Stack>
          </Box>
        </motion.div>

        {/* סעיף מי אני */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              background: `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
              position: "relative",
              overflow: "hidden",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: -50,
                right: -50,
                width: 200,
                height: 200,
                borderRadius: "50%",
                bgcolor: "primary.light",
                opacity: 0.2,
                filter: "blur(40px)",
              }}
            />
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              <Groups sx={{ mr: 1, verticalAlign: "middle" }} />
              About Me
            </Typography>
            <Typography paragraph>
              Passionate full-stack developer with leadership experience in
              elite technology units. Specializing in building scalable web
              applications with modern JavaScript frameworks.
            </Typography>
            <Typography paragraph>
              My approach combines technical excellence with strong teamwork and
              problem-solving skills honed in high-pressure environments.
            </Typography>
            <Grid container spacing={2} mt={2}>
              {[
                {
                  icon: <Terminal color="primary" />,
                  title: "10+ Projects",
                  desc: "Completed across various domains",
                },
                {
                  icon: <MilitaryTech color="primary" />,
                  title: "Team Leader",
                  desc: "Managed 5 developers in Unit 8200",
                },
                {
                  icon: <DesignServices color="primary" />,
                  title: "Full-Stack",
                  desc: "End-to-end development expertise",
                },
                {
                  icon: <Psychology color="primary" />,
                  title: "Problem Solver",
                  desc: "Complex system design & optimization",
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} md={3} key={index}>
                  <motion.div whileHover={{ y: -5 }}>
                    <Paper
                      sx={{
                        p: 3,
                        height: "100%",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        textAlign: "center",
                      }}
                    >
                      <Avatar sx={{ bgcolor: "primary.50", mb: 2 }}>
                        {item.icon}
                      </Avatar>
                      <Typography variant="h6" fontWeight="bold">
                        {item.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {item.desc}
                      </Typography>
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* סעיף טכנולוגיות */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
              color: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              <Code sx={{ mr: 1, verticalAlign: "middle" }} />
              Tech Stack
            </Typography>
            <Typography paragraph sx={{ color: "grey.300" }}>
              Here are the technologies I work with on a daily basis
            </Typography>

            <Grid container spacing={4} mt={2}>
              {skills.map((category, index) => (
                <Grid item xs={12} sm={6} md={4} key={index}>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        color: "primary.light",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      <Star sx={{ mr: 1, fontSize: "1rem" }} /> {category.name}
                    </Typography>
                    <Stack direction="row" flexWrap="wrap" gap={1}>
                      {category.items.map((skill) => (
                        <motion.div
                          key={skill}
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Chip
                            label={skill}
                            sx={{
                              bgcolor: "rgba(255,255,255,0.1)",
                              color: "white",
                              "&:hover": {
                                bgcolor: "primary.main",
                              },
                            }}
                          />
                        </motion.div>
                      ))}
                    </Stack>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* סעיף פרויקטים */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Box mb={6}>
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              <Launch sx={{ mr: 1, verticalAlign: "middle" }} />
              Featured Projects
            </Typography>
            <Typography paragraph color="text.secondary">
              Some of my recent work showcasing my skills and approach
            </Typography>

            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              pagination={true}
              navigation={true}
              modules={[EffectCoverflow, Pagination, Navigation]}
              style={{
                padding: "40px 0",
                width: "100%",
              }}
            >
              {projects.map((project, index) => (
                <SwiperSlide
                  key={index}
                  style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                    width: "300px",
                    height: "400px",
                    borderRadius: "16px",
                  }}
                >
                  <motion.div
                    whileHover={{ scale: 1.03 }}
                    style={{ height: "100%" }}
                  >
                    <Paper
                      sx={{
                        height: "100%",
                        backgroundImage: `linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.7)), url(${project.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        color: "white",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "flex-end",
                        p: 3,
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" gutterBottom>
                        {project.desc}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1} mb={2}>
                        {project.tech.map((tech) => (
                          <Chip
                            key={tech}
                            label={tech}
                            size="small"
                            sx={{
                              bgcolor: "rgba(255,255,255,0.2)",
                              color: "white",
                            }}
                          />
                        ))}
                      </Stack>
                      <Button
                        href={project.link}
                        target="_blank"
                        variant="contained"
                        color="primary"
                        startIcon={<Launch />}
                        fullWidth
                      >
                        View Project
                      </Button>
                    </Paper>
                  </motion.div>
                </SwiperSlide>
              ))}
            </Swiper>
          </Box>
        </motion.div>

        {/* סעיף ניסיון תעסוקתי */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              background: `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              <Work sx={{ mr: 1, verticalAlign: "middle" }} />
              Professional Journey
            </Typography>

            <Box sx={{ position: "relative", mt: 4 }}>
              {/* קו ציר זמן */}
              <Box
                sx={{
                  position: "absolute",
                  left: { xs: 20, sm: 30 },
                  top: 0,
                  bottom: 0,
                  width: "4px",
                  bgcolor: "primary.main",
                  borderRadius: 2,
                }}
              />

              {/* פריטי ציר זמן */}
              {[
                {
                  title: "Software Developer & Team Leader",
                  company: "Unit 8200, IDF",
                  period: "2023 – Present",
                  details: [
                    "Led a squad of 5 developers after promotion in 2025",
                    "Developed systems using React, Node.js, and Angular",
                    "Created backend APIs and optimized database structures",
                    "Worked with QA, UI/UX, and product teams in agile settings",
                  ],
                },
                {
                  title: "Full-Stack Developer Course",
                  company: "IDF Military Technical Course, KODKOD",
                  period: "2023",
                  details: [
                    "Intensive 6-month full-stack development program",
                    "Focused on modern web technologies and best practices",
                    "Graduated with honors",
                  ],
                },
              ].map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  style={{ position: "relative", marginBottom: "40px" }}
                >
                  {/* נקודת ציר זמן */}
                  <Box
                    sx={{
                      position: "absolute",
                      left: { xs: 8, sm: 18 },
                      top: 5,
                      width: "24px",
                      height: "24px",
                      borderRadius: "50%",
                      bgcolor: "primary.main",
                      border: "4px solid white",
                      boxShadow: 2,
                    }}
                  />
                  <Box sx={{ ml: { xs: 6, sm: 8 }, pl: { xs: 4, sm: 6 } }}>
                    <Typography variant="h6" fontWeight="bold">
                      {item.title}
                    </Typography>
                    <Typography color="text.secondary" gutterBottom>
                      {item.company} • {item.period}
                    </Typography>
                    <List dense>
                      {item.details.map((detail, i) => (
                        <ListItem key={i} sx={{ pl: 0 }}>
                          <ListItemText
                            primary={detail}
                            primaryTypographyProps={{
                              variant: "body2",
                            }}
                            sx={{
                              "&:before": {
                                content: '"•"',
                                color: "primary.main",
                                mr: 1,
                              },
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                </motion.div>
              ))}
            </Box>
          </Paper>
        </motion.div>

        {/* סעיף השכלה */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              background: `linear-gradient(135deg, ${theme.palette.primary.dark} 0%, ${theme.palette.secondary.dark} 100%)`,
              color: "white",
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              <School sx={{ mr: 1, verticalAlign: "middle" }} />
              Education
            </Typography>

            <Grid container spacing={3} mt={2}>
              {[
                {
                  degree: "Software Engineering (Practical Engineer)",
                  institution: "College of Management",
                  period: "2024 – Present",
                },
                {
                  degree: "Full-Stack Military Systems",
                  institution: "IDF Military Technical Course, KODKOD",
                  period: "2023",
                },
                {
                  degree: "Advanced Studies in Math, English & CS",
                  institution: "IDF KODKOD",
                  period: "2023",
                },
                {
                  degree: "High Yeshiva Torah Studies",
                  institution: "Yeshivat Meirat Shemu'a",
                  period: "2016 – 2022",
                },
              ].map((item, index) => (
                <Grid item xs={12} sm={6} key={index}>
                  <motion.div whileHover={{ x: 5 }}>
                    <Paper
                      sx={{
                        p: 3,
                        height: "100%",
                        bgcolor: "rgba(255,255,255,0.1)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <Typography variant="h6" fontWeight="bold">
                        {item.degree}
                      </Typography>
                      <Typography color="primary.light" gutterBottom>
                        {item.institution}
                      </Typography>
                      <Chip
                        label={item.period}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255,255,255,0.2)",
                          color: "white",
                        }}
                      />
                    </Paper>
                  </motion.div>
                </Grid>
              ))}
            </Grid>
          </Paper>
        </motion.div>

        {/* סעיף יצירת קשר */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Paper
            elevation={6}
            sx={{
              p: 4,
              mb: 6,
              background: `linear-gradient(45deg, ${theme.palette.background.paper} 0%, ${theme.palette.grey[100]} 100%)`,
            }}
          >
            <Typography variant="h4" fontWeight="bold" gutterBottom>
              Let's Connect
            </Typography>
            <Typography paragraph color="text.secondary">
              Interested in working together or have questions? Get in touch!
            </Typography>

            <Grid container spacing={4} mt={2}>
              <Grid item xs={12} md={6}>
                <Box
                  component="form"
                  sx={{
                    "& .MuiTextField-root": { mb: 2 },
                  }}
                >
                  <TextField fullWidth label="Your Name" variant="outlined" />
                  <TextField
                    fullWidth
                    label="Email Address"
                    variant="outlined"
                  />
                  <TextField
                    fullWidth
                    label="Message"
                    multiline
                    rows={4}
                    variant="outlined"
                  />
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      fullWidth
                    >
                      Send Message
                    </Button>
                  </motion.div>
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 3,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    background: `linear-gradient(135deg, ${theme.palette.grey[900]} 0%, ${theme.palette.common.black} 100%)`,
                    color: "white",
                  }}
                >
                  <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Contact Info
                  </Typography>
                  <List>
                    <ListItem>
                      <ListItemText
                        primary="Email"
                        secondary="chaimcymerman0548492309@gmail.com"
                        primaryTypographyProps={{
                          color: "primary.light",
                        }}
                        secondaryTypographyProps={{
                          color: "grey.300",
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Phone"
                        secondary="+972 54-849-2309"
                        primaryTypographyProps={{
                          color: "primary.light",
                        }}
                        secondaryTypographyProps={{
                          color: "grey.300",
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="GitHub"
                        secondary="github.com/ChaimCymerman0548492309"
                        primaryTypographyProps={{
                          color: "primary.light",
                        }}
                        secondaryTypographyProps={{
                          color: "grey.300",
                        }}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="LinkedIn"
                        secondary="linkedin.com/in/chaim-cymerman-94961423a"
                        primaryTypographyProps={{
                          color: "primary.light",
                        }}
                        secondaryTypographyProps={{
                          color: "grey.300",
                        }}
                      />
                    </ListItem>
                  </List>

                  <Stack direction="row" spacing={2} mt={2}>
                    {[
                      {
                        icon: <GitHub />,
                        href: "https://github.com/ChaimCymerman0548492309",
                      },
                      {
                        icon: <LinkedIn />,
                        href: "https://linkedin.com/in/chaim-cymerman-94961423a",
                      },
                      {
                        icon: <Email />,
                        href: "mailto:chaimcymerman0548492309@gmail.com",
                      },
                      {
                        icon: <Phone />,
                        href: "tel:+972548492309",
                      },
                    ].map((item, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ y: -5 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <IconButton
                          href={item.href}
                          target="_blank"
                          sx={{
                            bgcolor: "rgba(255,255,255,0.1)",
                            color: "white",
                            "&:hover": {
                              bgcolor: "primary.main",
                            },
                          }}
                        >
                          {item.icon}
                        </IconButton>
                      </motion.div>
                    ))}
                  </Stack>
                </Paper>
              </Grid>
            </Grid>
          </Paper>
        </motion.div>

        {/* כותרת תחתונה */}
        <Box textAlign="center" mt={8} mb={4}>
          <motion.div
            animate={{
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: "reverse",
            }}
          >
            <Typography variant="h5" fontWeight="bold" gutterBottom>
              Let's build something amazing together 💡
            </Typography>
          </motion.div>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} Chaim Cymerman. All rights reserved.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}
