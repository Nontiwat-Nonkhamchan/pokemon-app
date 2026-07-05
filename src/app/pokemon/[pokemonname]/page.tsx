"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link"; // 👈 เพิ่ม
import {
  Container,
  Typography,
  Avatar,
  Card,
  CardContent,
  Chip,
  Box,
  Button, // 👈 เพิ่ม
} from "@mui/material";

interface PokemonData {
  name: string;
  sprites: {
    front_default: string;
  };
  cries: {
    latest: string;
  };
  types: {
    type: {
      name: string;
    };
  }[];
  stats: {
    base_stat: number;
    stat: {
      name: string;
    };
  }[];
}

export default function PokemonDetailPage({
  params,
}: {
  params: Promise<{ pokemonname: string }>;
}) {
  const { pokemonname } = use(params);

  const [pokemon, setPokemon] = useState<PokemonData | null>(null);
  const [evolution, setEvolution] = useState<string[]>([]);

  useEffect(() => {
    fetchPokemon();
  }, []);

  async function fetchPokemon() {
    //ข้อมูลโปเกม่อน
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon/${pokemonname}`
    );
    const data = await res.json();
    setPokemon(data);

    //species
    const speciesRes = await fetch(
      `https://pokeapi.co/api/v2/pokemon-species/${pokemonname}`
    );
    const species = await speciesRes.json();

    //evolution
    const evoRes = await fetch(species.evolution_chain.url);
    const evo = await evoRes.json();

    const evoList: string[] = [];

    function getEvolution(chain: any) {
      evoList.push(chain.species.name);

      if (chain.evolves_to.length > 0) {
        chain.evolves_to.forEach((item: any) => getEvolution(item));
      }
    }

    getEvolution(evo.chain);

    setEvolution(evoList);
  }

  if (!pokemon) {
    return <Typography>Loading...</Typography>;
  }

  return (
    <Container sx={{ mt: 5 }}>
      <Card
        sx={{
        borderRadius:5,
        boxShadow:6
         }}
         >
        <CardContent>

          <Avatar
            src={pokemon.sprites.front_default}
            sx={{
              width: 180,
              height: 180,
              mx: "auto",
            }}
          />

          <Typography
            variant="h3"
            align="center"
            sx={{ textTransform: "capitalize", mt: 2 }}
          >
            {pokemon.name}
          </Typography>

          <Typography variant="h5" sx={{ mt: 3 }}>
            ประเภท
          </Typography>

          {pokemon.types.map((type) => (
            <Chip
              key={type.type.name}
              label={type.type.name}
              sx={{ mr: 1, mt: 1 }}
            />
          ))}

          <Typography variant="h5" sx={{ mt: 4 }}>
            สถานะ
          </Typography>

          {pokemon.stats.map((stat) => (
            <Typography key={stat.stat.name}>
              {stat.stat.name} : {stat.base_stat}
            </Typography>
          ))}

          <Typography variant="h5" sx={{ mt: 4 }}>
            วิวัฒนาการ
          </Typography>

          {evolution.map((evo) => (
            <Typography
              key={evo}
              sx={{ textTransform: "capitalize" }}
            >
              {evo}
            </Typography>
          ))}

          <Typography variant="h5" sx={{ mt: 4 }}>
            เสียงของโปเกม่อน
          </Typography>

          <Box sx={{ mt: 2 }}>
            <audio controls src={pokemon.cries.latest}></audio>
          </Box>

            {/* 🔙 Back Button */}
          <Box sx={{ mb: 2 }}>
           <Button
            variant="outlined"
            component={Link}
            href="/"
            >
            ← Back
           </Button>
          </Box>

        </CardContent>
      </Card>
    </Container>
  );
}