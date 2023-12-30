import { Gasto } from "./Gasto";

export const ListadoGastos = ({
  gastos,
  setGastoEditar,
  eliminarGasto,
  gastosFiltrados,
  filtro,
}) => {
  return (
    <div className="listado-gastos contenedor">
     

      {filtro
        ? (
          <>
           <h2>{gastosFiltrados.length ? "Gastos" : "No hay gastos en esta categoria "}</h2>
          {gastosFiltrados.map((gfiltro) => (
            <Gasto
              gastos={gfiltro}
              key={gfiltro.id}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
          </>
        ):( 
          <>
           <h2>{gastos.length ? "Gastos" : "No hay gastos"}</h2>
          {gastos.map((gasto) => (
            <Gasto
              gastos={gasto}
              key={gasto.id}
              setGastoEditar={setGastoEditar}
              eliminarGasto={eliminarGasto}
            />
          ))}
           </>
          )
         
          }
      
    </div>
  );
};
