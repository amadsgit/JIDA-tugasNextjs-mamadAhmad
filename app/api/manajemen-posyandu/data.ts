// api/manajemen-posyandu/data.ts

export type Posyandu = {
  id: number;
  nama: string;
  alamat: string;
  wilayah: string;
  kelurahan: string;
};

class PosyanduStore {
  private data: Posyandu[] = [
    {
      id: 1,
      nama: 'Posyandu Melati',
      alamat: 'Jl. Melati No. 10',
      wilayah: 'RW 01',
      kelurahan: 'Parung',
    },
    {
      id: 2,
      nama: 'Posyandu Mawar',
      alamat: 'Jl. Mawar No. 19',
      wilayah: 'RW 05',
      kelurahan: 'Pasirkareumbi',
    },
  ];

  getAll() {
    return this.data;
  }

  getById(id: number) {
    return this.data.find((item) => item.id === id);
  }

  add(item: Posyandu) {
    this.data.push(item);
  }

  update(id: number, newData: Omit<Posyandu, 'id'>) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      this.data[index] = { id, ...newData };
      return true;
    }
    return false;
  }

  delete(id: number) {
    const index = this.data.findIndex((item) => item.id === id);
    if (index !== -1) {
      return this.data.splice(index, 1)[0];
    }
    return null;
  }
}

// Singleton instance
export const posyanduStore = new PosyanduStore();
