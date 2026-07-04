"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  Typography,
  Container,
  Card,
  CardContent,
  Avatar,
  Grid,
  CardActionArea,
  Button,
  Box,
  Skeleton,
} from "@mui/material";

interface PokemonResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

const LIMIT = 20;

export default function Home() {
  const [pokemonList, setPokemonList] = useState<
    { name: string; url: string }[]
  >([]);

  const [count, setCount] = useState(0);
  const [offset, setOffset] = useState(0);

  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);

  const fetchPokemon = async () => {
    if (loading || loadingMore) return;

    if (pokemonList.length === 0) setLoading(true);
    else setLoadingMore(true);

    try {
      const response = await fetch(
        `https://pokeapi.co/api/v2/pokemon?limit=${LIMIT}&offset=${offset}`
      );

      const data: PokemonResponse = await response.json();

      setCount(data.count);
setPokemonList((prev) => {
  const newList = [...prev, ...data.results];

  const unique = Array.from(
    new Map(newList.map((p) => [p.name, p])).values()
  );

  return unique;
});
      setOffset((prev) => prev + LIMIT);
    } catch (error) {
      console.error("Error fetching Pokemon:", error);
    }

    setLoading(false);
    setLoadingMore(false);
  };

  useEffect(() => {
    fetchPokemon();
  }, []);

  const renderSkeletons = () => {
    return Array.from({ length: 8 }).map((_, i) => (
      <Grid size={{ xs: 12, sm: 6, md: 3 }} key={i}>
        <Card>
          <CardContent sx={{ textAlign: "center" }}>
            <Skeleton
              variant="circular"
              width={80}
              height={80}
              sx={{ mx: "auto", mb: 2 }}
            />
            <Skeleton variant="text" width="60%" sx={{ mx: "auto" }} />
          </CardContent>
        </Card>
      </Grid>
    ));
  };

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h3" align="center" gutterBottom>
        Pokemon App
      </Typography>

      {/* 🔥 About Page Button */}
      <Box sx={{ textAlign: "center", mb: 2 }}>
        <Button component={Link} href="/aboutthisproject" variant="outlined">
          About This Project
        </Button>
      </Box>

      <Typography align="center" sx={{ mb: 3 }}>
        แสดง {pokemonList.length} / {count} ตัว
      </Typography>

      <Grid container spacing={2}>
        {/* Skeleton ตอนโหลดครั้งแรก */}
        {loading && pokemonList.length === 0
          ? renderSkeletons()
          : pokemonList.map((pokemon) => {
              const pokemonId = pokemon.url.split("/")[6];

              return (
                <Grid size={{ xs: 12, sm: 6, md: 3 }} key={pokemon.name}>
                  <Card>
                    <CardActionArea href={`/pokemon/${pokemon.name}`}>
                      <CardContent sx={{ textAlign: "center" }}>
                        <Avatar
                          alt={pokemon.name}
                          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemonId}.png`}
                          sx={{
                            width: 80,
                            height: 80,
                            mx: "auto",
                            mb: 2,
                          }}
                        />

                        <Typography
                          variant="h6"
                          sx={{ textTransform: "capitalize" }}
                        >
                          {pokemon.name}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}

        {/* Skeleton ตอน Load More */}
        {loadingMore && renderSkeletons()}
      </Grid>

      <Box sx={{ textAlign: "center", my: 4 }}>
        {loading && pokemonList.length === 0 ? (
          <Typography>Loading...</Typography>
        ) : pokemonList.length < count ? (
          <Button
            variant="contained"
            onClick={fetchPokemon}
            disabled={loadingMore}
          >
            {loadingMore ? "Loading..." : "Load More"}
          </Button>
        ) : (
          <Typography>โหลดครบทั้งหมดแล้ว ({count} ตัว)</Typography>
        )}
      </Box>
    </Container>
  );
}