package AlertaDTO;

import java.util.List;

public class AlertaDTO {
	private String nombre;
	private String Turno;
	private String color;
	private String mail;
	private String descripcionAlerta;
	private int contadorLlamados;
	private int tiempoEstimadoParaAtencion;
	private List<Alerta> alertas;
	private int cantidadMaximaLlamadas;
//	private Root root;
// getter y setter	
	public String getNombre() {
		return nombre;
	}

	public void setNombre(String nombre) {
		this.nombre = nombre;
	}

	public String getMail() {
		return mail;
	}

	public void setMail(String mail) {
		this.mail = mail;
	}

	public String getTurno() {
		return Turno;
	}

	public void setTurno(String turno) {
		Turno = turno;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}


	public List<Alerta> getAlertas() {
		return alertas;
	}

	public void setAlertas(List<Alerta> alertas) {
		this.alertas = alertas;
	}

	public int getContadorLlamados() {
		return contadorLlamados;
	}

	public void setContadorLlamados(int contadorLlamados) {
		this.contadorLlamados = contadorLlamados;
	}

	public int getTiempoEstimadoParaAtencion() {
		return tiempoEstimadoParaAtencion;
	}

	public void setTiempoEstimadoParaAtencion(int tiempoEstimadoParaAtencion) {
		this.tiempoEstimadoParaAtencion = tiempoEstimadoParaAtencion;
	}

	public String getDescripcionAlerta() {
		return descripcionAlerta;
	}

	public void setDescripcionAlerta(String descripcionAlerta) {
		this.descripcionAlerta = descripcionAlerta;
	}

	public int getCantidadMaximaLlamadas() {
		return cantidadMaximaLlamadas;
	}

	public void setCantidadMaximaLlamadas(int cantidadMaximaLlamadas) {
		this.cantidadMaximaLlamadas = cantidadMaximaLlamadas;
	}

/*	public Root getRoot() {
		return root;
	}

	public void setRoot(Root root) {
		this.root = root;
	}
*/
}