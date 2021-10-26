// DTO para recibir Atención desde JSON

package AlertaDTO;

public class Atencion {
    private int id;
    private Turno turno;
    private Cliente cliente;
    private TipoAtencion tipoAtencion;
    private int contadorLlamados;
    private String fechaCreacion;
    private Object fechaCreacionLlamada;
    
    
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public Turno getTurno() {
		return turno;
	}
	public void setTurno(Turno turno) {
		this.turno = turno;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}
	public TipoAtencion getTipoAtencion() {
		return tipoAtencion;
	}
	public void setTipoAtencion(TipoAtencion tipoAtencion) {
		this.tipoAtencion = tipoAtencion;
	}
	public int getContadorLlamados() {
		return contadorLlamados;
	}
	public void setContadorLlamados(int contadorLlamados) {
		this.contadorLlamados = contadorLlamados;
	}
	public String getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public Object getFechaCreacionLlamada() {
		return fechaCreacionLlamada;
	}
	public void setFechaCreacionLlamada(Object fechaCreacionLlamada) {
		this.fechaCreacionLlamada = fechaCreacionLlamada;
	}
    
    
}
