package mov.personal.pcstats.server;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class TestController {

    @GetMapping("/hello")
    public ResponseEntity<String> test(){
        return new ResponseEntity<>("world!", HttpStatus.OK);
    }


}
