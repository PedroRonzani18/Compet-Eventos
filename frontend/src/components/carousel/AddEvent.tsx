'use client'
import React, { useState } from 'react';


const AddEvent: React.FC = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Aqui você pode enviar os dados do evento para o backend ou fazer o que for necessário
    console.log('Event submitted:', { name, description });

    // Limpar os campos após o envio
    setName('');
    setDescription('');
  };

  return (
    <div>
      <div className="container">
        <h1>Add New Event</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Event Name:</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="description">Event Description:</label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <button type="submit">Add Event</button>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
