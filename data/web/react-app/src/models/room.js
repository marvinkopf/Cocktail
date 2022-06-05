import { useState, useEffect } from "react";

export function getRoom(id) {
    return fetch("http://100.26.178.70:8000/api/raeume/"+id)
      .then(res => res.json());
}

export function addIngToRoom(roomId, name) {
  return fetch("http://100.26.178.70:8000/api/raeume/"+roomId+"/ingredients/add", {
            method: "POST",
            body: JSON.stringify({"name":name}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}

export function removeIngFromRoom(roomId, id) {
  console.log("the id is: " + id);
  return fetch("http://100.26.178.70:8000/api/raeume/"+roomId+"/ingredients/remove", {
            method: "DELETE",
            body: JSON.stringify({"id":id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}