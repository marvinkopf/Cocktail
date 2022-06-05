import { useState, useEffect } from "react";

export function getRoom(id) {
    return fetch("http://100.26.178.70:3030/rooms/"+id)
      .then(res => res.json());
}

export function addIngToRoom(roomId, name) {
  return fetch("http://100.26.178.70:3030/rooms/"+roomId+"/ingredients/add", {
            method: "POST",
            body: JSON.stringify({"name":name}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}

export function removeIngFromRoom(roomId, id) {
  return fetch("http://100.26.178.70:3030/rooms/"+roomId+"/ingredients/remove", {
            method: "POST",
            body: JSON.stringify({"id":id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}