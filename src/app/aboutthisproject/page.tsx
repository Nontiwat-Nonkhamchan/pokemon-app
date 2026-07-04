"use client";

import Link from "next/link";
import {
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Typography,
  Chip,
} from "@mui/material";

export default function AboutPage() {
  return (
    <Container maxWidth="md" sx={{ py: 5 }}>
      {/* Back Button */}
      <Button component={Link} href="/" variant="contained" sx={{ mb: 3 }}>
        ← Back to Home
      </Button>

      <Card elevation={6}>
        <CardContent>
          {/* Title */}
          <Typography variant="h3" align="center" gutterBottom>
            About This Project
          </Typography>

          <Typography align="center" color="text.secondary">
            Pokémon Web Application using Next.js + PokeAPI
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Project Description */}
          <Typography variant="h5" gutterBottom>
            📌 Project Overview
          </Typography>

          <Typography sx={{ mb: 3 }}>
            เว็บไซต์นี้พัฒนาขึ้นเพื่อแสดงข้อมูล Pokémon โดยดึงข้อมูลจาก PokeAPI
            พร้อมแสดงรายละเอียดของโปเกมอน ได้แก่ ชื่อ รูปภาพ ประเภท ค่าสถานะ
            เสียง และวิวัฒนาการ
          </Typography>

          {/* Developer */}
          <Typography variant="h5" gutterBottom>
            👨‍💻 Developer
          </Typography>

          <Typography>ชื่อ : นายนนทิวรรธน์ นนท์คำจันทร์</Typography>
          <Typography>รหัสนักศึกษา : 673450196-2</Typography>

          <Divider sx={{ my: 3 }} />

          {/* Course */}
          <Typography variant="h5" gutterBottom>
            🎓 Course Information
          </Typography>

          <Typography>รายวิชา : Front-end Web Programming</Typography>
          <Typography>หลักสูตร : วิทยาการคอมพิวเตอร์</Typography>
          <Typography>
            มหาวิทยาลัย : มหาวิทยาลัยขอนแก่นวิทยาเขตหนองคาย
          </Typography>

          <Divider sx={{ my: 3 }} />

          {/* Tech Stack */}
          <Typography variant="h5" gutterBottom>
            ⚙️ Technology Stack
          </Typography>

          <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mt: 1 }}>
            <Chip label="Next.js" color="primary" />
            <Chip label="React" color="primary" />
            <Chip label="Material UI" color="primary" />
            <Chip label="PokeAPI" color="primary" />
          </Box>

          <Divider sx={{ my: 3 }} />

          {/* GitHub */}
          <Typography variant="h5" gutterBottom>
            🔗 GitHub Source Code
          </Typography>

          <Typography>
            <Link
              href="https://github.com/Nattaphoom-Saensiriphokh/pokemon-app"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "#1976d2", fontWeight: 500 }}
            >
              https://github.com/Nontiwat-Nonkhamchan/pokemon-app
            </Link>
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}