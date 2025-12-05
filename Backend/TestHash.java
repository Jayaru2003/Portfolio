import org.springframework.security.crypto.bcrypt.BCrypt;
public class TestHash {
    public static void main(String[] args) {
        String password = "admin123";
        String hash = "$2a$10$N.zmdr9k7uOCQb376NoUnuTJ8iAt6Z5EHsM8ssKQqpKp0GjN36Z02";
        System.out.println("Password: " + password);
        System.out.println("Hash: " + hash);
        System.out.println("Match: " + BCrypt.checkpw(password, hash));
    }
}
