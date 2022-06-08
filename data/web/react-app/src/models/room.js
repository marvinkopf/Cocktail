import { useState, useEffect } from "react";
import { getDjangoUrl, getNpmUrl } from "../urls"
import { getZutatenFromIdArray } from "./zutat" 
export const api = getDjangoUrl();

export async function getRoom(id) {
     const room = await fetch(api+"/api/raeume/"+id)
      .then(res => res.json());
      
      //room.recipes = room.recipes.map(async recipe => {return {...recipe,ingredients: await getZutatenFromIdArray(recipe.ingredients)}})
      for (let i = 0; i < room.recipes.length; i++) {
        const ingredients = await getZutatenFromIdArray(room.recipes[i].ingredients);
        room.recipes[i] = {...room.recipes[i], ingredients}

      }
      return room;
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