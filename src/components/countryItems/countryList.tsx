import { useState, useEffect } from "react";
import { getCountries, deleteCountry, type Country } from "../../services/api";
import CountryItem from "./countryItem";
import CountryForm from "./countryForm";

const CountryList = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const fetchCountries = async () => {
    setLoading(true);
    try {
      const data = await getCountries();
      setCountries(data);
      console.log("Países obtenidos:", data);
      setError(null);
    } catch (err) {
      setError("Error al cargar los países");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async (id: string) => {
    if (window.confirm("¿Estás seguro de que quieres eliminar este país?")) {
      try {
        await deleteCountry(id);
        setCountries(countries.filter((country) => country.id !== id));
      } catch (err) {
        setError("Error al eliminar el país");
      }
    }
  };
  const handleEdit = (id: string) => {
    setEditingId(id);
  };
  const handleCancelEdit = () => {
    setEditingId(null);
  };
  const handleFormSubmit = () => {
    fetchCountries();
    setEditingId(null);
  };
  if (loading) return <div>Cargando países...</div>;
  if (error) return <div className="error">{error}</div>;
  return (
    <div className="country-list">
      <h2>Lista de Países</h2>
      {!editingId && (
        <div className="new-country">
          <h3>Agregar Nuevo País</h3>
          <CountryForm onSubmitSuccess={handleFormSubmit} />
        </div>
      )}
      <div className="countries">
        {countries.length === 0 || !Array.isArray(countries) ? (
          <p>No hay países registrados.</p>
        ) : (
          countries.map((country) => (
            <div key={country.id}>
              {editingId === country.id ? (
                <div className="edit-form">
                  <h3>Editar País</h3>
                  <CountryForm
                    country={country}
                    onSubmitSuccess={handleFormSubmit}
                    onCancel={handleCancelEdit}
                  />
                </div>
              ) : (
                <CountryItem
                  country={country}
                  onDelete={() => handleDelete(country.id)}
                  onEdit={() => handleEdit(country.id)}
                />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};
export default CountryList;
