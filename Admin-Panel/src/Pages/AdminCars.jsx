import { useEffect, useState } from "react";
import axios from "../api/axios";
import { motion, AnimatePresence } from "framer-motion";
import {
  Pencil,
  Trash2,
  Plus,
  X,
  Car,
  Tag,
  Users,
  IndianRupee,
  ImagePlus
} from "lucide-react";
import { toast } from "react-toastify";

export default function AdminCars() {
  const [cars, setCars] = useState([]);
  const [category, setCategory] = useState("All");
  const [editingCar, setEditingCar] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [form, setForm] = useState({
    name: "",
    category: "SUV",
    seats: "",
    price: "",
    imageFile: null,
  });

  const API_BASE = "https://apexaadmin.online";

  const fetchCars = async () => {
    const res = await axios.get("/cars", {
      params: category === "All" ? {} : { category },
    });
    setCars(res.data.cars);
  };

  useEffect(() => {
    fetchCars();
  }, [category]);

  /* ================= ADD ================= */
const handleAddCar = async (e) => {
  e.preventDefault();

  const formData = new FormData();

  formData.append("name", form.name);
  formData.append("category", form.category);
  formData.append("seats", form.seats);
  formData.append("price", form.price);

  if (form.imageFile) {
    formData.append("image", form.imageFile);
  }

  try {
    const res = await axios.post("/cars", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(res.data.message);
    setShowAddModal(false);
    fetchCars();

    setForm({
      name: "",
      category: "SUV",
      seats: "",
      price: "",
      imageFile: null,
    });

  } catch (err) {
    console.log(err.response?.data);
    toast.error(err.response?.data?.message || "Error adding car");
  }
};

  const deleteCar = async (id) => {
    if (!window.confirm("Delete this car?")) return;
    await axios.delete(`/cars/${id}`);
    toast.success("Car deleted");
    fetchCars();
  };

 const updateCar = async () => {
  const formData = new FormData();

  formData.append("name", editingCar.name);
  formData.append("category", editingCar.category);
  formData.append("seats", editingCar.seats);
  formData.append("price", editingCar.price);

  if (editingCar.imageFile) {
    formData.append("image", editingCar.imageFile);
  } else if (editingCar.image === "") {
    formData.append("image", "");
  }

  try {
    const res = await axios.put(`/cars/${editingCar._id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    toast.success(res.data.message);
    setEditingCar(null);
    fetchCars();
  } catch (err) {
    toast.error(err.response?.data?.message || "Error updating car");
  }
};

  return (
    <div className="w-full text-white">

      {/* HEADER CENTERED */}
      <div className="flex justify-between items-center text-center mb-10">
        <div className="flex items-center gap-3 mb-4 max-sm:mb-0">
          <Car size={28} className="text-orange-400" />
          <h1 className="text-3xl max-sm:text-[18px] font-bold tracking-wide">
            Manage Cars
          </h1>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 bg-gradient-to-r from-orange-500 to-yellow-500 px-8 max-sm:px-4 py-3 max-sm:py-2 rounded-full hover:scale-105 transition-all shadow-xl cursor-pointer"
        >
          <Plus size={18} /> Add New Car
        </button>
      </div>

      {/* FILTER */}
      <div className="flex justify-center gap-4 mb-10 flex-wrap">
        {["All", "SUV", "Sedan", "Traveller"].map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`px-6 py-2 rounded-full text-sm transition-all cursor-pointer flex items-center gap-2 ${category === cat
              ? "bg-gradient-to-r from-orange-500 to-yellow-500"
              : "bg-white/5 hover:bg-white/10 border border-white/10"
              }`}
          >
            <Tag size={14} />
            {cat}
          </button>
        ))}
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <motion.div
            key={car._id}
            whileHover={{ y: -6 }}
            transition={{ duration: 0.25 }}
            className="group relative bg-[#111827] border border-white/10 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl hover:border-orange-500/40 transition-all"
          >
            {/* IMAGE SECTION */}
            <div className="relative h-52 overflow-hidden">
              {car.image ? (
                <img
                  src={`${API_BASE}${car.image}`}
                  alt={car.name}
                  className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop"; }}
                />
              ) : (
                <div className="h-full w-full bg-white/5 flex flex-col items-center justify-center gap-2 text-gray-500">
                  <ImagePlus size={36} className="text-gray-600" />
                  <span className="text-sm">No Image Uploaded</span>
                </div>
              )}

              {/* CATEGORY BADGE */}
              <div className="absolute top-4 left-4 bg-black/60 backdrop-blur-md px-3 py-1 rounded-full text-xs flex items-center gap-1 border border-white/10">
                <Tag size={12} className="text-orange-400" />
                {car.category}
              </div>
            </div>

            {/* CONTENT */}
            <div className="p-6">

              {/* CAR NAME */}
              <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
                <Car size={16} className="text-orange-400" />
                {car.name}
              </h3>

              {/* INFO ROW */}
              <div className="flex justify-between text-sm text-gray-400 mb-4">

                <div className="flex items-center gap-1">
                  <Users size={14} />
                  {car.seats} Seats
                </div>

                <div className="flex items-center gap-1 text-orange-400 font-semibold">
                  <IndianRupee size={14} />
                  {car.price}
                </div>
              </div>

              {/* DIVIDER */}
              <div className="h-px bg-white/10 mb-4"></div>

              {/* ACTION BUTTONS */}
              <div className="flex justify-between items-center">

                <button
                  onClick={() => setEditingCar(car)}
                  className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-400 transition-all cursor-pointer"
                >
                  <Pencil size={14} />
                  Edit
                </button>

                <button
                  onClick={() => deleteCar(car._id)}
                  className="flex items-center gap-1 text-sm px-4 py-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-400 transition-all cursor-pointer"
                >
                  <Trash2 size={14} />
                  Delete
                </button>

              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ================= MODAL ================= */}
      <AnimatePresence>
        {(showAddModal || editingCar) && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.85 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.85 }}
              className="bg-[#111827] border border-white/10 rounded-2xl p-8 w-[95%] max-w-md relative shadow-2xl"
            >
              <button
                onClick={() => {
                  setShowAddModal(false);
                  setEditingCar(null);
                }}
                className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer"
              >
                <X size={20} />
              </button>

              <h2 className="text-xl font-semibold mb-6 text-center">
                {editingCar ? "Edit Car" : "Add Car"}
              </h2>

              <form onSubmit={editingCar ? undefined : handleAddCar} className="space-y-4">

                {/* NAME */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3">
                  <Car size={16} className="text-orange-400" />
                  <input
                    placeholder="Car Name"
                    className="w-full p-3 bg-transparent outline-none"
                    value={editingCar ? editingCar.name : form.name}
                    onChange={(e) =>
                      editingCar
                        ? setEditingCar({ ...editingCar, name: e.target.value })
                        : setForm({ ...form, name: e.target.value })
                    }
                  />
                </div>

                {/* CATEGORY */}
                <div className="relative w-full">

                  {/* Icon */}
                  <Tag
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-orange-400 pointer-events-none"
                  />

                  {/* Select */}
                  <select
                    className="w-full pl-10 pr-10 py-3 bg-[#0f1630] text-white 
               border border-white/10 rounded-lg 
               outline-none focus:border-orange-400 
               appearance-none"
                    value={editingCar ? editingCar.category : form.category}
                    onChange={(e) =>
                      editingCar
                        ? setEditingCar({ ...editingCar, category: e.target.value })
                        : setForm({ ...form, category: e.target.value })
                    }
                  >
                    <option value="SUV">SUV</option>
                    <option value="Sedan">Sedan</option>
                    <option value="Traveller">Traveller</option>
                  </select>

                  {/* Custom Arrow */}
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-white/50">
                    ▼
                  </div>

                </div>

                {/* SEATS */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3">
                  <Users size={16} className="text-orange-400" />
                  <input
                    type="number"
                    placeholder="Seats"
                    className="w-full p-3 bg-transparent outline-none"
                    value={editingCar ? editingCar.seats : form.seats}
                    onChange={(e) =>
                      editingCar
                        ? setEditingCar({ ...editingCar, seats: e.target.value })
                        : setForm({ ...form, seats: e.target.value })
                    }
                  />
                </div>

                {/* PRICE */}
                <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg px-3">
                  <IndianRupee size={16} className="text-orange-400" />
                  <input
                    type="number"
                    placeholder="Price"
                    className="w-full p-3 bg-transparent outline-none"
                    value={editingCar ? editingCar.price : form.price}
                    onChange={(e) =>
                      editingCar
                        ? setEditingCar({ ...editingCar, price: e.target.value })
                        : setForm({ ...form, price: e.target.value })
                    }
                  />
                </div>

                {/* IMAGE UPLOAD / PREVIEW SECTION */}
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold text-gray-400">Car Image</span>
                  
                  {((editingCar && editingCar.imageFile) || (!editingCar && form.imageFile)) ? (
                    /* If a new file is chosen */
                    <div className="relative rounded-lg overflow-hidden border border-white/10 h-32 bg-white/5 flex items-center justify-between p-3">
                      <img
                        src={URL.createObjectURL(editingCar ? editingCar.imageFile : form.imageFile)}
                        alt="Preview"
                        className="h-full w-24 object-cover rounded"
                      />
                      <div className="flex-1 min-w-0 px-3">
                        <p className="text-sm text-gray-300 truncate">
                          {(editingCar ? editingCar.imageFile : form.imageFile).name}
                        </p>
                        <p className="text-xs text-yellow-400">New Image Selected</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => {
                          if (editingCar) {
                            setEditingCar({ ...editingCar, imageFile: null });
                          } else {
                            setForm({ ...form, imageFile: null });
                          }
                        }}
                        className="p-2 hover:bg-white/10 text-red-500 rounded-full transition cursor-pointer"
                        title="Remove selected image"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ) : (editingCar && editingCar.image) ? (
                    /* If editing a car that has an existing image in DB */
                    <div className="relative rounded-lg overflow-hidden border border-white/10 h-32 bg-white/5 flex items-center justify-between p-3">
                      <img
                        src={`${API_BASE}${editingCar.image}`}
                        alt="Current"
                        className="h-full w-24 object-cover rounded"
                        onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=100&h=100&fit=crop"; }}
                      />
                      <div className="flex-1 min-w-0 px-3">
                        <p className="text-sm text-gray-300 truncate">
                          {editingCar.image.split('/').pop()}
                        </p>
                        <p className="text-xs text-gray-500">Current Image</p>
                      </div>
                      <div className="flex gap-2">
                        <label className="p-2 hover:bg-white/10 text-orange-400 rounded-full transition cursor-pointer" title="Change image">
                          <ImagePlus size={18} />
                          <input
                            type="file"
                            accept="image/*"
                            hidden
                            onChange={(e) =>
                              setEditingCar({
                                ...editingCar,
                                imageFile: e.target.files[0],
                              })
                            }
                          />
                        </label>
                        <button
                          type="button"
                          onClick={() => {
                            if (window.confirm("Are you sure you want to delete this car's image?")) {
                              setEditingCar({ ...editingCar, image: "" });
                            }
                          }}
                          className="p-2 hover:bg-white/10 text-red-500 rounded-full transition cursor-pointer"
                          title="Delete current image"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </div>
                  ) : (
                    /* Default: Show upload button */
                    <label className="flex items-center justify-center gap-2 border border-dashed border-white/20 rounded-lg p-4 cursor-pointer hover:bg-white/5 transition">
                      <ImagePlus size={18} />
                      Upload Car Image
                      <input
                        type="file"
                        accept="image/*"
                        hidden
                        onChange={(e) =>
                          editingCar
                            ? setEditingCar({
                              ...editingCar,
                              imageFile: e.target.files[0],
                            })
                            : setForm({
                              ...form,
                              imageFile: e.target.files[0],
                            })
                        }
                      />
                    </label>
                  )}
                </div>

                <button
                  type={editingCar ? "button" : "submit"}
                  onClick={editingCar ? updateCar : undefined}
                  className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 py-3 rounded-lg font-semibold hover:scale-105 transition-all"
                >
                  {editingCar ? "Update Car" : "Add Car"}
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}