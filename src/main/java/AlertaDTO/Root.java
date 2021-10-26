package AlertaDTO;

import java.util.List;

public class Root {
	private String emailRecibido;
	private Atencion atencion;
	private TipoAtencion TipoAtencion;
	private String fechaCreacion;
	private List<Alerta> alertas;
	private int cantidadMaximaLlamadas;
	private int tiempoEstimadoParaAtencion;
	private Cliente cliente;
	
	
	public String getEmailRecibido() {
		return emailRecibido;
	}
	public void setEmailRecibido(String emailRecibido) {
		this.emailRecibido = emailRecibido;
	}
	public Atencion getAtencion() {
		return atencion;
	}
	public void setAtencion(Atencion atencion) {
		this.atencion = atencion;
	}
	public TipoAtencion getTipoAtencion() {
		return TipoAtencion;
	}
	public void setTipoAtencion(TipoAtencion tipoAtencion) {
		TipoAtencion = tipoAtencion;
	}
	public String getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(String fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public List<Alerta> getAlertas() {
		return alertas;
	}
	public void setAlertas(List<Alerta> alertas) {
		this.alertas = alertas;
	}
	public int getCantidadMaximaLlamadas() {
		return cantidadMaximaLlamadas;
	}
	public void setCantidadMaximaLlamadas(int cantidadMaximaLlamadas) {
		this.cantidadMaximaLlamadas = cantidadMaximaLlamadas;
	}
	public int getTiempoEstimadoParaAtencion() {
		return tiempoEstimadoParaAtencion;
	}
	public void setTiempoEstimadoParaAtencion(int tiempoEstimadoParaAtencion) {
		this.tiempoEstimadoParaAtencion = tiempoEstimadoParaAtencion;
	}
	public Cliente getCliente() {
		return cliente;
	}
	public void setCliente(Cliente cliente) {
		this.cliente = cliente;
	}

	
	
}
