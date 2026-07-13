"use client";

import { useState, useEffect } from "react";
import { MapPin, Plus, Trash2, Loader2 } from "lucide-react";
import { axiosInstance as api } from "@/lib/axios";
import { toast } from "react-hot-toast";

export default function AddressManager() {
  const [addresses, setAddresses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [newAddress, setNewAddress] = useState({ street: '', city: '', state: '', zip: '', country: '' });

  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await api.get("/user/addresses");
      if (res.data) {
        setAddresses(res.data.data || res.data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    setAddresses(prev => prev.filter(a => a.id !== id));
    await api.delete(`/user/addresses/${id}`);
  };

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await api.post("/user/addresses", newAddress);
      if (res.data) {
        toast.success("Address added successfully");
        setIsAdding(false);
        setNewAddress({ street: '', city: '', state: '', zip: '', country: '' });
        fetchAddresses();
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div className="flex justify-center p-12"><Loader2 className="w-8 h-8 animate-spin text-primary" /></div>;
  }

  return (
    <div className="bg-surface rounded-2xl p-8 border border-outline-variant shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-2xl font-bold text-on-background">Your Addresses</h3>
          <p className="text-sm text-on-surface-variant mt-1">Manage your shipping addresses</p>
        </div>
        {!isAdding && (
          <button onClick={() => setIsAdding(true)} className="flex items-center gap-2 px-4 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="w-4 h-4" /> Add New
          </button>
        )}
      </div>

      {isAdding && (
        <form onSubmit={handleAdd} className="mb-8 p-6 bg-surface-container-low rounded-xl border border-outline-variant/60">
          <h4 className="font-bold text-on-background mb-4">Add New Address</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <input type="text" placeholder="Street" required value={newAddress.street} onChange={e => setNewAddress({...newAddress, street: e.target.value})} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg" />
            <input type="text" placeholder="City" required value={newAddress.city} onChange={e => setNewAddress({...newAddress, city: e.target.value})} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg" />
            <input type="text" placeholder="State" required value={newAddress.state} onChange={e => setNewAddress({...newAddress, state: e.target.value})} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg" />
            <input type="text" placeholder="ZIP Code" required value={newAddress.zip} onChange={e => setNewAddress({...newAddress, zip: e.target.value})} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg" />
            <input type="text" placeholder="Country" required value={newAddress.country} onChange={e => setNewAddress({...newAddress, country: e.target.value})} className="w-full px-4 py-2 bg-surface border border-outline-variant rounded-lg md:col-span-2" />
          </div>
          <div className="flex justify-end gap-3">
            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 font-bold text-on-surface-variant hover:text-on-background">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-primary text-on-primary font-bold rounded-lg hover:bg-primary/90">Save Address</button>
          </div>
        </form>
      )}

      {addresses.length === 0 && !isAdding ? (
        <div className="text-center py-8">
          <MapPin className="w-12 h-12 text-outline-variant mx-auto mb-4" />
          <p className="text-on-surface-variant">No addresses saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {addresses.map(addr => (
            <div key={addr.id} className="border border-outline-variant/60 rounded-xl p-5 relative hover:border-primary/40 transition-colors bg-surface-container-lowest/50">
               <button onClick={() => handleDelete(addr.id)} className="absolute top-4 right-4 p-2 text-on-surface-variant hover:text-error bg-surface rounded-full shadow-sm">
                 <Trash2 className="w-4 h-4" />
               </button>
               <div className="flex items-start gap-3">
                 <MapPin className="w-5 h-5 text-primary mt-1" />
                 <div>
                   <p className="font-bold text-on-background">{addr.street}</p>
                   <p className="text-sm text-on-surface-variant mt-1">{addr.city}, {addr.state} {addr.zip}</p>
                   <p className="text-sm text-on-surface-variant">{addr.country}</p>
                 </div>
               </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
