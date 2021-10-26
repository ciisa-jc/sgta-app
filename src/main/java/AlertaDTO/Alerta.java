package AlertaDTO;

import java.util.Date;

public class Alerta {
	private int id;
	private String color;
	private String colorHtml;
	private int duracionDesde;
	private int duracionHasta;
	private String descripcion;
	private Date fechaCreacion;
	
	
	public int getId() {
		return id;
	}
	public void setId(int id) {
		this.id = id;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getColorHtml() {
		return colorHtml;
	}
	public void setColorHtml(String colorHtml) {
		this.colorHtml = colorHtml;
	}
	public int getDuracionDesde() {
		return duracionDesde;
	}
	public void setDuracionDesde(int duracionDesde) {
		this.duracionDesde = duracionDesde;
	}
	public int getDuracionHasta() {
		return duracionHasta;
	}
	public void setDuracionHasta(int duracionHasta) {
		this.duracionHasta = duracionHasta;
	}
	public String getDescripcion() {
		return descripcion;
	}
	public void setDescripcion(String descripcion) {
		this.descripcion = descripcion;
	}
	public Date getFechaCreacion() {
		return fechaCreacion;
	}
	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	
	
	
	
}
