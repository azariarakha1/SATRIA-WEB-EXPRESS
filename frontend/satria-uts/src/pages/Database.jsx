import React, { useEffect, useState } from "react";
import axios from "axios";

export default function Database() {
  const [siswa, setSiswa] = useState([]);
  const [form, setForm] = useState({ nama: "", kelas: "", alamat: "" });
  const [editId, setEditId] = useState(null);

  // Load data siswa
  const loadData = async () => {
    const res = await axios.get("http://localhost:5000/siswa");
    setSiswa(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Tambah atau Update siswa
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (editId) {
      await axios.put(`http://localhost:5000/siswa/${editId}`, form);
    } else {
      await axios.post("http://localhost:5000/siswa", form);
    }

    setForm({ nama: "", kelas: "", alamat: "" });
    setEditId(null);
    loadData();
  };

  // Edit siswa
  const handleEdit = (item) => {
    setEditId(item.id);
    setForm({
      nama: item.nama,
      kelas: item.kelas,
      alamat: item.alamat,
    });
  };

  // Delete siswa
  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:5000/siswa/${id}`);
    loadData();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
        <h1 className="text-3xl font-bold text-center mb-6">📚 Data Siswa</h1>

        {/* Form Input */}
        <form onSubmit={handleSubmit} className="space-y-4 mb-8">
          <input
            name="nama"
            value={form.nama}
            onChange={handleChange}
            placeholder="Nama Siswa"
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            name="kelas"
            value={form.kelas}
            onChange={handleChange}
            placeholder="Kelas"
            className="w-full p-3 border rounded-xl"
            required
          />

          <input
            name="alamat"
            value={form.alamat}
            onChange={handleChange}
            placeholder="Alamat"
            className="w-full p-3 border rounded-xl"
            required
          />

          <button className="w-full bg-green-600 text-white py-3 rounded-xl hover:bg-green-700">
            {editId ? "Update Siswa" : "Tambah Siswa"}
          </button>
        </form>

        {/* Tabel */}
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-4">Nama</th>
              <th className="p-4">Kelas</th>
              <th className="p-4">Alamat</th>
              <th className="p-4 text-center">Aksi</th>
            </tr>
          </thead>

          <tbody className="space-y-4">
            {siswa.map((item) => (
              <tr
                key={item.id}
                className="bg-white shadow-md rounded-xl hover:shadow-lg transition"
              >
                <td className="p-4">{item.nama}</td>
                <td className="p-4">{item.kelas}</td>
                <td className="p-4">{item.alamat}</td>
                <td className="p-4 flex gap-4 justify-center">
                  <button
                    onClick={() => handleEdit(item)}
                    className="px-3 py-1 bg-purple-600 hover:bg-purple-700 shadow text-white rounded-lg"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="px-3 py-1 bg-red-600 hover:bg-red-700 shadow text-white rounded-lg"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
