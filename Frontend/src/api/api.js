const API_BASE = `${import.meta.env.VITE_BACKEND_LINK}/api/user`;

// Profile photo

export const updatProfile = async (data ,token) =>{
  const res = await fetch(`${API_BASE}/profilePhoto`,{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({ profilePhoto: data })
  });
}

export const removeProfilePhoto = async (token) => {
  const res = await fetch(`${API_BASE}/profilePhoto`,{
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const registerUser = async (data) => {
  const res = await fetch(`${API_BASE}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const loginUser = async (data) => {
  const res = await fetch(`${API_BASE}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  return res.json();
};

export const getUser = async (token) => {
  const res = await fetch (`${API_BASE}/getUser`,{
    headers : { Authorization: `Bearer ${token}`},
  })
  return res.json();
}

export const getDesignById = async (id, token) => {
  const res = await fetch(`${API_BASE}/design/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};



// Handle Creations

export const fetchCreations = async (token) => {
  const res = await fetch(`${API_BASE}/creations`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};

export const addCreation = async (data, token) => {
  const res = await fetch(`${API_BASE}/creations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });
 

  const contentType = res.headers.get("content-type");

  if (!res.ok) {
    const text = await res.text(); 
    throw new Error(`Request failed: ${res.status} - ${text}`);
  }

  if (contentType && contentType.includes("application/json")) {
    return res.json();
  } else {
    throw new Error("Invalid JSON response from server");
  }

};

export const deleteFromCreations = async (id, token) => {
  const res = await fetch(`${API_BASE}/creations/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to delete from creations");
  return res.json();
};



// Handle Trash

export const fetchTrash = async (token) => {
  const res = await fetch(`${API_BASE}/trash`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};


export const moveToTrash = async (id, token) => {
  const res = await fetch(`${API_BASE}/trash/${id}`, {
    method: "POST", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return res.json();
};

export const restoreFromTrash = async (id, token) => {
  const res = await fetch(`${API_BASE}/restore/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to restore");
  return res.json();
};


export const deleteFromTrash = async (id, token) => {
  const res = await fetch(`${API_BASE}/trash/${id}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.json();
};
