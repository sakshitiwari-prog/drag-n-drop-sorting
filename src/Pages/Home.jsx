import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import PlaceCard from '../Components/PlaceCard';
import { get } from '../utils/serviceHelper';

const SortablePlaceCard = ({ place }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
  } = useSortable({ id: place.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}

      className="w-full">
      <PlaceCard place={place} />
    </div>
  );
};

const Home = () => {
  const [places, setPlaces] = useState([]);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const res = await get('/places.json');
        setPlaces(res);
      } catch (err) {
        console.error('Failed to fetch:', err);
      }
    };
    fetchPlaces();
  }, []);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      const oldIndex = places.findIndex(item => item.id === active.id);
      const newIndex = places.findIndex(item => item.id === over?.id);
      setPlaces((items) => arrayMove(items, oldIndex, newIndex));
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
      {/* LEFT COLUMN */}
      <div className="w-full md:w-1/2 bg-white overflow-auto">

        {/* ────── Header Section ────── */}
        <div className="text-start px-6  md:px-8 py-4 bg-white">
          <div className="flex items-center justify-between mb-[23px] mt-[10px]">
            {/* Brand */}
            <div className="text-[#FF0080] font-extrabold text-lg border-2 border-dashed border-pink-500 px-3 py-1 rounded-md tracking-widest">
              Y2Z TRAVEL
            </div>

            {/* Menu Icon (Mobile Only) */}
            <div className="flex flex-col justify-center items-center md:hidden">
              <div className="w-[18px] h-[2px] bg-gray-500 rounded-full mb-1" />
              <div className="w-[18px] h-[2px] bg-gray-500 rounded-full mb-1" />
              <div className="w-[18px] h-[2px] bg-gray-500 rounded-full" />
            </div>
          </div>

          <div className="mt-4 md:ml-[43px]">
            <h1 className="text-2xl mb-[6px] font-bold">Itinerary</h1>
            <p className="text-[#8392AB] font-[700]">Day</p>
          </div>
        </div>

        {/* ────── Itinerary Cards ────── */}
        <div
          className="p-4 md:p-8 space-y-4 touch-none"
        >
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext
              items={places.map(p => p.id)}
              strategy={verticalListSortingStrategy}
            >
              {places.map((place) => (
                <SortablePlaceCard key={place.id} place={place} />
              ))}
            </SortableContext>
          </DndContext>
        </div>

      </div>

      {/* RIGHT COLUMN: Map */}
      <div className="w-full md:w-1/2 h-64 md:h-auto md:block hidden relative">
        <img
          src="/images/steetmap.png"
          alt="Map"
          className="w-full h-full object-cover rounded-t-lg md:rounded-l-lg md:rounded-tr-none"
        />
      </div>
    </div>
  );
}

export default Home;
