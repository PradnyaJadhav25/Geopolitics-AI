package com.geopoliticsai.api;
import java.util.List;
import java.util.Map;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.RestClient;
@RestController @RequestMapping("/api")
public class IntelligenceController {
  private final RestClient ai = RestClient.builder().baseUrl("http://localhost:8000").build();
  private final ObjectMapper json;
  public IntelligenceController(ObjectMapper json) { this.json = json; }
  @GetMapping("/health") public Map<String,Object> health(){return Map.of("status","ok","modules",List.of("simulation","countries","market","funds","recommendations","knowledge-graph","chatbot"));}
  @PostMapping("/simulations") public Object simulate(@RequestBody Map<String,Object> request) throws Exception {return ai.post().uri("/simulate").contentType(MediaType.APPLICATION_JSON).body(json.writeValueAsBytes(request)).retrieve().body(Object.class);}
  @GetMapping("/knowledge-graph") public Map<String,Object> graph(){return Map.of("nodes",List.of("India","United States","Japan","Russia","Quad","BRICS"),"links",List.of("alliance","trade","defence"));}
  @PostMapping("/chat") public Map<String,Object> chat(@RequestBody Map<String,String> request){return Map.of("response","The decision engine is available. Use a simulation to receive scenario-specific futures and recommendations.","query",request.getOrDefault("message",""));}
}
