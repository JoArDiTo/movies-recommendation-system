import React, { useState } from 'react';
import { locationList, genreList, moodList, yearList, durationList } from '../constants/Values';
import { fetchRecommendations } from '../api/connection';
import Input from './Input';
import type { Movie } from '../types/Movie';
import { MovieCard } from './MovieCard';

export const MoviePreferenceForm = () => {
    const [dataRequest, setdataRequest] = useState<{
        location: string[]
        genre: string[];
        mood: string[];
        year: number[];
        duration: number[];
        popularity: number[];
    }>(
        {
            location: [],
            genre: [],
            mood: [],
            year: [],
            duration: [],
            popularity: []
        }
    );

    const [movies, setMovies] = useState<Movie[]>([]);

    // Función genérica para manejar el estado de selección y deselección
    const handleToggle = <T,>(category: string, value: T) => {
        setdataRequest((prevState) => {
            const categoryList = prevState[category as keyof typeof prevState] as T[];
            const isAlreadySelected = categoryList.includes(value);
            return {
                ...prevState,
                [category]: isAlreadySelected
                    ? categoryList.filter((item) => item !== value)
                    : [...categoryList, value]
            };
        });
    };

    async function handleSubmit(e: React.MouseEvent<HTMLButtonElement>) {
        e.preventDefault();
        if (dataRequest.location.length === 0) alert('Por favor, seleccione una locación');
        else if (dataRequest.genre.length === 0) alert('Por favor, seleccione un género');
        else if (dataRequest.mood.length === 0) alert('Por favor, seleccione un estado de ánimo');
        else if (dataRequest.year.length === 0) alert('Por favor, seleccione un año');
        else if (dataRequest.duration.length === 0) alert('Por favor, seleccione una duración');
        else if (dataRequest.popularity.length === 0) alert('Por favor, seleccione una popularidad');
        else {
            console.log(dataRequest);
            const data = await fetchRecommendations(dataRequest);
            if (data.message) alert(data.message);
            else setMovies(data);
        }
    }


    return (
        <>
            <div className='py-5'>
                <h2 className='text-white text-center sm:text-xl md:text-2xl xl:text-4xl'>RECOMENDEMOS TU PRÓXIMA PELÍCULA FAVORITA</h2>
            </div>
            <div className='grid grid-cols-1 px-5'>
                <form className='grid gap-y-3'>
                    <div className='h-auto py-4 px-8 bg-white rounded-lg'>
                        <label className="block text-xl font-semibold text-gray-700">Elíja su locación favorita</label>
                        <div className='grid grid-cols-1 xl:grid-cols-3'>
                            {locationList.map((location) => (
                                 <Input
                                    key={location}
                                    value={location}
                                    onClick={() => handleToggle('location', location)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='h-auto py-4 px-8 bg-white rounded-lg'>
                        <label className="block text-xl font-semibold text-gray-700">Elíja sus géneros favoritos</label>
                        <div className='grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4'>
                            {genreList.map((genre) => (
                                <Input
                                    key={genre}
                                    value={genre}
                                    onClick={() => handleToggle('genre', genre)}
                                />
                            ))}                 
                        </div>
                    </div>
                    <div className='h-auto py-4 px-8 bg-white rounded-lg'>
                        <label className="block text-xl font-semibold text-gray-700">Elíja su estado de ánimo</label>
                        <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3'>
                            {moodList.map((mood) => (
                                <Input
                                    key={mood}
                                    value={mood}
                                    onClick={() => handleToggle('mood', mood)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='h-auto py-4 px-8 bg-white rounded-lg'>
                        <label className="block text-xl font-semibold text-gray-700">Elíja el año de temporada</label>
                        <div className='grid grid-cols-2 xl:grid-cols-4'>
                            {yearList.map((year) => (
                                <Input
                                    key={year}
                                    value={year.toString()}
                                    onClick={() => handleToggle('year', year)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='h-auto py-4 px-8 bg-white rounded-lg'>
                        <label className="block text-xl font-semibold text-gray-700">Elíja la duración de la película (hora aproximada)</label>
                        <div className='grid grid-cols-1 xl:grid-cols-3'>
                            {durationList.map((duration) => (
                                <Input
                                    key={duration}
                                    value={duration.toString()}
                                    onClick={() => handleToggle('duration', duration * 70)}
                                />
                            ))}
                        </div>
                    </div>
                    <div className='h-auto py-4 px-8 bg-white rounded-lg'>
                        <label className="block text-xl font-semibold text-gray-700">Elíja la popularidad (1-10)</label>
                        <div className='grid grid-cols-5 xl:grid-cols-10'>
                            {Array.from({ length: 10 }, (_, i) => i + 1).map((popularity) => (
                                <Input
                                    key={popularity}
                                    value={popularity.toString()}
                                    onClick={() => handleToggle('popularity', popularity)}
                                />
                            ))}
                        </div>
                    </div>
                </form>
                <div className='w-full grid place-items-center py-4'>
                    <button 
                        className='bg-violet-600 hover:bg-violet-700 transition hover:scale-110 text-white text-xl font-semibold py-2 px-20 rounded-lg'
                        onClick={handleSubmit}
                    >
                        Buscar
                    </button>
                </div>
            </div>
            <div className='grid grid-cols-2 md:grid-cols-4 gap-10 pt-8'>
                {
                    movies.map((movie) => (
                        <MovieCard key={movie.title} movie={movie} />
                    ))
                }
            </div>
        </>
    )
}