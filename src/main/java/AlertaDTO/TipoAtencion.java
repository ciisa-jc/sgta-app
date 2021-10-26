// DTO para recepción del tipo de atención

package AlertaDTO;

public class TipoAtencion {
    private int id;
    private String nombre;
    private int tiempoAtencion;
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public int getTiempoAtencion() {
		return tiempoAtencion;
	}
	public void setTiempoAtencion(int tiempoAtencion) {
		this.tiempoAtencion = tiempoAtencion;
	}
    
    
    
}
