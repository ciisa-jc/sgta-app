package AlertaSGTA;

import org.springframework.stereotype.Controller;
import java.io.IOException;
import java.net.URL;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.simp.annotation.SendToUser;
import com.fasterxml.jackson.databind.ObjectMapper;

import AlertaDTO.AlertaDTO;
import AlertaDTO.Root;

@Controller
public class AlertaController {
	@MessageMapping("/hello")
	@SendToUser("/topic/greetings")

	public AlertaDTO receive(AlertaDTO message) throws Exception {
		String mail_2 = message.getMail();
		get_turno(mail_2, message);
		return message;
	}

//parsea el json y valida si existe el cliente
	private void get_turno(String mail_2, AlertaDTO message) {
		ObjectMapper mapper = new ObjectMapper();
		String URL = "https://sgtasec.herokuapp.com/api/atenciones/" + mail_2;
		try {
			Root map = mapper.readValue(new URL(URL), Root.class);
			if (map.getAlertas() == null) {
				message.setTurno("No se encontró su turno, favor acérquese a Recepción");
			} else {
				clear_data(message);
				full_data(map, message);
			}
		} catch (IOException e) {
			message.setTurno("Not_URL");
			e.printStackTrace();
		}

	}

//llenar mensaje que se devolverá a al cliente alertas
	public void full_data(Root map, AlertaDTO message) {
		message.setNombre(
				map.getAtencion().getCliente().getNombre() + " " + map.getAtencion().getCliente().getApellidoPaterno()
						+ " " + map.getAtencion().getCliente().getApellidoMaterno());
		message.setTurno(map.getAtencion().getTurno().getTurnoAtencion());
		message.setContadorLlamados(map.getAtencion().getContadorLlamados());
		message.setTiempoEstimadoParaAtencion(map.getTiempoEstimadoParaAtencion());
		message.setAlertas(map.getAlertas());
		add_Alerta(message);
		
		if (message.getContadorLlamados() == map.getCantidadMaximaLlamadas()) {
			clear_data(message);
			message.setTurno("Su máximo de llamadas fue alcanzado, acérquese a recepción");
		}

	}

	private void add_Alerta(AlertaDTO message) {
		int SW = 0;
		for (int i = 0; i < message.getAlertas().size(); i++) {
			if (message.getTiempoEstimadoParaAtencion() >= message.getAlertas().get(i).getDuracionDesde()
					&& message.getTiempoEstimadoParaAtencion() <= message.getAlertas().get(i).getDuracionHasta()) {
				message.setColor(message.getAlertas().get(i).getColorHtml());
				message.setDescripcionAlerta(message.getAlertas().get(i).getDescripcion());
				SW = 1;
			} // end if
		} // end for
		if (SW == 0) {
			message.setDescripcionAlerta("Por favor acérquese a realizar atención");
		}
	} // end proc

	private void clear_data(AlertaDTO message) {
		message.setNombre(null);
		message.setTurno(null);
		message.setContadorLlamados(0);
		message.setTiempoEstimadoParaAtencion(0);
		message.setAlertas(null);
		message.setColor(null);
		message.setDescripcionAlerta(null);

	}
}
