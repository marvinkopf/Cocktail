import { useState, useEffect } from "react";
import { getDjangoUrl, getNpmUrl } from "../urls"
const api = getDjangoUrl();

export function getRoom(id) {
    return fetch(api+"/api/raeume/"+id)
      .then(res => res.json());
}

export function createRoom(name) {
  return fetch(api+"/api/raeume/", {
            method: "POST",
            body: JSON.stringify({"name":name}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}

export function addIngToRoom(roomId, name) {
  return fetch(api+"/api/raeume/"+roomId+"/ingredients/add", {
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
  return fetch(api+"/api/raeume/"+roomId+"/ingredients/remove", {
            method: "DELETE",
            body: JSON.stringify({"id":id}),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });
}