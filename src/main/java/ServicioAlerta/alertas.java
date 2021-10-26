package ServicioAlerta;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonUnwrapped;
@JsonIgnoreProperties(ignoreUnknown = true)

public class alertas {

	@JsonUnwrapped
	private List<alertas> String;
	
}
