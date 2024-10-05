import type { Movie } from '../types/Movie';

export const MovieCard = ({ movie }: { movie: Movie }) => {
    return (
        <div className="grid grid-cols-1 place-items-center border rounded-xl border-white w-52 md:w-72 py-2 md:py-5 transition hover:scale-110">
            <img 
                className="w-32 md:w-48"
                src={movie.img}
                alt={movie.title}
            />
            <p className="text-md md:text-xl max-w-40 py-2 text-center font-bold text-yellow-500">
                {movie.title}
            </p>
            <p className="text-white">{movie.director}</p>
        </div>
    );
}