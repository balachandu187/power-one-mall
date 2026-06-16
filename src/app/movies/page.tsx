'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Play, Clock, Sparkles, MapPin, Heart, Smile } from 'lucide-react';
import { MOVIES_DATA, Movie } from '@/data/mockData';
import Modal from '@/components/ui/Modal';
import Toast from '@/components/ui/Toast';

export default function MoviesPage() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedSeats, setSelectedSeats] = useState<number[]>([]);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState('');

  // Spotlight pointer tracking in Hero
  const heroRef = useRef<HTMLDivElement>(null);
  const [spotlightPos, setSpotlightPos] = useState({ x: 50, y: 50 });

  const handleHeroMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = heroRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setSpotlightPos({ x, y });
  };

  // Row and seat counts for seat selection layout
  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 8;
  const ticketPrice = 250; // INR

  const handleBookClick = (movie: Movie) => {
    setSelectedMovie(movie);
    setSelectedTime(movie.showTimings[0]); // Default to first timing
    setSelectedSeats([]);
  };

  const handleShowTimeClick = (movie: Movie, time: string) => {
    setSelectedMovie(movie);
    setSelectedTime(time);
    setSelectedSeats([]);
  };

  const handleSeatClick = (seatIndex: number) => {
    if (selectedSeats.includes(seatIndex)) {
      setSelectedSeats(selectedSeats.filter((s) => s !== seatIndex));
    } else {
      setSelectedSeats([...selectedSeats, seatIndex]);
    }
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedMovie && selectedTime && selectedSeats.length > 0) {
      setToastMessage(
        `Booking Confirmed! ${selectedSeats.length} ticket(s) for ${selectedMovie.title} at ${selectedTime}. Seat numbers: ${selectedSeats
          .map((s) => {
            const rowLetter = rows[Math.floor(s / seatsPerRow)];
            const seatNumber = (s % seatsPerRow) + 1;
            return `${rowLetter}${seatNumber}`;
          })
          .join(', ')}.`
      );
      setShowToast(true);
      setSelectedMovie(null);
      setSelectedTime('');
      setSelectedSeats([]);
    }
  };

  return (
    <div className="cinema-dark min-h-screen py-16 transition-colors duration-300 overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Cinema Banner Hero with spotlight tracking */}
        <motion.div
          ref={heroRef}
          onMouseMove={handleHeroMouseMove}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden mb-16 h-[40vh] min-h-[300px] flex items-center border border-white/5 shadow-2xl cursor-crosshair"
        >
          <Image
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&q=80&w=1200"
            alt="INOX Multiplex lobby preview"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-transparent" />
          
          {/* Spotlight overlay effect */}
          <div
            className="absolute inset-0 pointer-events-none opacity-30 dark:opacity-45"
            style={{
              background: `radial-gradient(circle 200px at ${spotlightPos.x}% ${spotlightPos.y}%, rgba(251, 191, 36, 0.22), transparent 75%)`,
            }}
          />

          <div className="relative z-10 px-8 sm:px-16 max-w-xl flex flex-col gap-4">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400/20 text-accent text-[10px] font-black uppercase tracking-widest border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              Inox Insignia Multiplex
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-black uppercase tracking-tight text-white leading-none">
              The Silver Screen Experience
            </h1>
            <p className="text-sm text-neutral-300 leading-relaxed">
              Featuring 6 state-of-the-art screens, luxury reclining seats, gourmet menu options, and cutting-edge Laser Projection systems on Third Floor.
            </p>
            <div className="flex items-center gap-2 text-xs font-bold text-neutral-400">
              <MapPin className="w-4 h-4 text-amber-500" />
              <span>Third Floor &bull; Power One Mall</span>
            </div>
          </div>
        </motion.div>

        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-16">
          <span className="block text-xs font-black uppercase tracking-[0.3em] text-accent">Now Showing</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-black tracking-tight mt-2 text-white">Select a Movie</h2>
          <div className="h-1.5 w-16 bg-gradient-to-r from-amber-400 to-amber-600 mx-auto mt-4 rounded-full" />
        </div>

        {/* Movie Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 relative z-10">
          {MOVIES_DATA.map((movie) => (
            <motion.div
              key={movie.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ type: 'spring', stiffness: 80, damping: 15 }}
              className="w-full h-full"
            >
              <div className="group cinema-card overflow-hidden flex flex-col relative w-full h-[660px]">
                {/* Poster Layer (Top - approx 60.6% height) */}
                <div className="relative h-[400px] w-full overflow-hidden flex-shrink-0">
                  <Image
                    src={movie.poster}
                    alt={movie.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover group-hover:scale-108 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                  />
                  
                  {/* Cinematic bottom gradient fade to details layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0202] via-[#0e0202]/25 to-transparent opacity-95 pointer-events-none" />

                  {/* Brand / Logo Accent at top-left of Poster (matches reference) */}
                  <div className="absolute top-4 left-4 z-10 flex flex-col gap-1.5 pointer-events-none opacity-90">
                    {/* Small round green & white dot */}
                    <div className="w-4 h-4 rounded-full bg-emerald-500 border border-white/20 flex items-center justify-center shadow-md">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                    {/* Three red bars */}
                    <div className="flex flex-col gap-1 pl-0.5">
                      <div className="w-7 h-0.5 bg-red-650 shadow" />
                      <div className="w-5 h-0.5 bg-red-650 shadow" />
                      <div className="w-6 h-0.5 bg-red-650 shadow" />
                    </div>
                  </div>
                </div>

                {/* Details Layer (Bottom - approx 39.4% height) */}
                <div className="p-6 flex flex-col justify-between h-[260px] bg-[#0e0202]/95 border-t border-white/5 relative z-10 flex-grow">
                  <div>
                    {/* Movie Title */}
                    <h3 className="text-xl font-extrabold tracking-tight text-white group-hover:text-secondary transition-colors duration-300 line-clamp-1">
                      {movie.title}
                    </h3>
                    
                    {/* Metadata Row: Rating Badge | Language | Duration */}
                    <div className="flex items-center gap-2 mt-2">
                      <span className="px-2 py-0.5 text-[10px] font-black border border-primary/30 text-primary bg-primary/10 rounded-md tracking-wider">
                        {movie.rating}
                      </span>
                      <span className="text-neutral-400 text-[11px] font-semibold tracking-wide uppercase">
                        {movie.language.split(', ')[0]}
                      </span>
                      <span className="text-neutral-600 text-xs font-bold">•</span>
                      <span className="text-neutral-450 text-[11px] font-semibold tracking-wide uppercase">
                        {movie.duration}
                      </span>
                    </div>

                    {/* Genre Tags (dot-separated) */}
                    <p className="text-[10px] font-extrabold text-accent uppercase tracking-widest mt-3">
                      {movie.genre.split(', ').join(' • ')}
                    </p>

                    {/* Short Summary (2 lines only) */}
                    <p className="text-xs text-neutral-450 leading-relaxed mt-2.5 line-clamp-2">
                      {movie.synopsis}
                    </p>
                  </div>

                  {/* Showtimes & Booking Button */}
                  <div className="mt-3 pt-3 border-t border-white/5 flex flex-col gap-3.5">
                    <div className="flex items-center justify-between">
                      <p className="text-[9px] font-black text-neutral-500 uppercase tracking-widest">Show Timings</p>
                      <span className="text-[9px] text-neutral-500 font-bold uppercase tracking-widest">Inox Multiplex</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {movie.showTimings.slice(0, 3).map((time) => (
                        <button
                          key={time}
                          type="button"
                          onClick={() => handleShowTimeClick(movie, time)}
                          className="bg-white/5 border border-white/10 hover:bg-primary/20 hover:border-primary/50 text-neutral-300 hover:text-white font-bold text-[10px] px-2.5 py-1.5 rounded-lg transition-all duration-305 cursor-pointer"
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                    
                    {/* Book Tickets Button */}
                    <button
                      onClick={() => handleBookClick(movie)}
                      className="w-full bg-gradient-to-r from-primary to-secondary hover:brightness-110 text-white font-black text-[11px] uppercase tracking-widest py-3 rounded-xl shadow-lg hover:shadow-primary/30 transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] active:scale-[0.98]"
                    >
                      <Play className="w-3.5 h-3.5 fill-white" />
                      Book Tickets
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Seat Booking Modal */}
      <Modal
        isOpen={selectedMovie !== null}
        onClose={() => setSelectedMovie(null)}
        title={selectedMovie ? `Book Tickets: ${selectedMovie.title}` : 'Book Ticket'}
      >
        {selectedMovie && (
          <form onSubmit={handleConfirmBooking} className="flex flex-col gap-5 text-neutral-800 dark:text-neutral-100">
            {/* Show timings selector */}
            <div>
              <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider mb-2">Select Show Time</p>
              <div className="flex flex-wrap gap-2">
                {selectedMovie.showTimings.map((time) => {
                  const isActive = selectedTime === time;
                  return (
                    <button
                      type="button"
                      key={time}
                      onClick={() => setSelectedTime(time)}
                      className="relative px-4 py-2.5 rounded-lg text-xs font-bold uppercase cursor-pointer text-neutral-700 dark:text-neutral-350 hover:text-neutral-900 dark:hover:text-white transition-colors duration-200"
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeCinemaTime"
                          className="absolute inset-0 bg-amber-400 rounded-lg z-0"
                          transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                        />
                      )}
                      <span className={`relative z-10 ${isActive ? 'text-neutral-950 font-black' : ''}`}>
                        {time}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Screen layout & interactive seats selection */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <p className="text-xs font-bold text-neutral-500 uppercase tracking-wider">Select Seats</p>
                <span className="text-xs text-neutral-400">₹{ticketPrice} / Seat</span>
              </div>

              {/* Screen Bar */}
              <div className="w-full h-1.5 bg-neutral-400 dark:bg-neutral-600 rounded-full shadow-lg mb-8 relative flex justify-center">
                <span className="absolute -bottom-5 text-[8px] font-black uppercase text-neutral-400 tracking-[0.2em]">Screen this way</span>
              </div>

              {/* Grid of Seats */}
              <div className="flex flex-col gap-2 max-w-sm mx-auto items-center">
                {rows.map((rowLetter, rowIdx) => (
                  <div key={rowLetter} className="flex items-center gap-1.5 min-[360px]:gap-2">
                    <span className="text-[10px] min-[360px]:text-xs font-bold w-3 min-[360px]:w-4 text-neutral-400 text-right">{rowLetter}</span>
                    <div className="flex gap-1 min-[360px]:gap-1.5">
                      {[...Array(seatsPerRow)].map((_, seatIdx) => {
                        const seatNumber = rowIdx * seatsPerRow + seatIdx;
                        const isSelected = selectedSeats.includes(seatNumber);
                        const isReserved = seatNumber === 3 || seatNumber === 14 || seatNumber === 27; // Dummy reserved seats

                        return (
                          <button
                            type="button"
                            key={seatIdx}
                            disabled={isReserved}
                            onClick={() => handleSeatClick(seatNumber)}
                            className={`w-6 h-6 min-[360px]:w-7.5 min-[360px]:h-7.5 rounded-md flex items-center justify-center text-[8px] min-[360px]:text-[10px] font-bold transition-all ${
                              isReserved
                                ? 'bg-neutral-300 dark:bg-neutral-800 text-neutral-400 dark:text-neutral-650 cursor-not-allowed opacity-50'
                                : isSelected
                                ? 'bg-amber-400 text-neutral-950 shadow-md font-black scale-105'
                                : 'bg-neutral-200 dark:bg-neutral-800 hover:bg-neutral-300 dark:hover:bg-neutral-750 text-neutral-800 dark:text-neutral-305 cursor-pointer'
                            }`}
                            title={isReserved ? 'Reserved' : `Seat ${rowLetter}${seatIdx + 1}`}
                          >
                            {isReserved ? 'X' : seatIdx + 1}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>

              {/* Legend */}
              <div className="flex items-center justify-center gap-5 mt-6 text-[10px] font-bold text-neutral-400 uppercase tracking-wider">
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-neutral-200 dark:bg-neutral-800" />
                  <span>Available</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-amber-400" />
                  <span>Selected</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3.5 h-3.5 rounded bg-neutral-300 dark:bg-neutral-800 opacity-50 flex items-center justify-center text-[8px] text-neutral-500">X</div>
                  <span>Sold Out</span>
                </div>
              </div>
            </div>

            {/* Summary */}
            {selectedSeats.length > 0 && (
              <div className="p-4 rounded-xl bg-amber-400/10 border border-amber-400/25 flex items-center justify-between text-sm">
                <div>
                  <p className="font-extrabold text-neutral-800 dark:text-neutral-100">
                    {selectedSeats.length} Ticket(s) Selected
                  </p>
                  <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Seats: {selectedSeats
                      .map((s) => {
                        const rowLetter = rows[Math.floor(s / seatsPerRow)];
                        const seatNumber = (s % seatsPerRow) + 1;
                        return `${rowLetter}${seatNumber}`;
                      })
                      .join(', ')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-black text-amber-500 text-lg">₹{selectedSeats.length * ticketPrice}</p>
                  <p className="text-[10px] text-neutral-400 uppercase tracking-widest">Incl. Taxes</p>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div className="flex gap-3 mt-2">
              <button
                type="submit"
                disabled={selectedSeats.length === 0}
                className={`flex-grow font-black text-xs uppercase tracking-widest py-3.5 rounded-xl text-center shadow-lg transition-colors cursor-pointer ${
                  selectedSeats.length === 0
                    ? 'bg-neutral-300 text-neutral-400 dark:bg-neutral-800 dark:text-neutral-600 cursor-not-allowed'
                    : 'bg-primary hover:bg-primary/95 text-white shadow-primary/20'
                }`}
              >
                Confirm &amp; Pay
              </button>
              <button
                type="button"
                onClick={() => setSelectedMovie(null)}
                className="px-6 border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-200/50 dark:hover:bg-neutral-800/50 text-neutral-700 dark:text-neutral-300 font-bold text-xs uppercase tracking-widest py-3.5 rounded-xl transition-colors cursor-pointer"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Success notification toast */}
      <Toast isVisible={showToast} message={toastMessage} onClose={() => setShowToast(false)} />
    </div>
  );
}
