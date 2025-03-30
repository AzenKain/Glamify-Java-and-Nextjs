package com.example.api_ecommerce.service;

import com.example.api_ecommerce.dto.request.AuthRequest;
import com.example.api_ecommerce.dto.response.AuthResponse;
import com.example.api_ecommerce.entity.User;
import com.example.api_ecommerce.enums.Role;
import com.example.api_ecommerce.exception.ApiRuntimeException;
import com.example.api_ecommerce.exception.ErrorCode;
import com.example.api_ecommerce.repository.UserRepository;
import com.nimbusds.jose.*;
import com.nimbusds.jose.crypto.MACSigner;
import com.nimbusds.jose.crypto.MACVerifier;
import com.nimbusds.jwt.JWTClaimsSet;
import com.nimbusds.jwt.SignedJWT;
import lombok.AccessLevel;
import lombok.RequiredArgsConstructor;
import lombok.experimental.FieldDefaults;
import lombok.experimental.NonFinal;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.*;
import org.springframework.util.CollectionUtils;

import java.text.ParseException;
import java.time.Instant;
import java.time.temporal.ChronoUnit;
import java.util.Date;
import java.util.StringJoiner;


@Service
@RequiredArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE, makeFinal = true)
public class AuthService {
    UserRepository userRepository;

    @NonFinal
    @Value("${jwt.signerKey}")
    protected String SIGNER_KEY;

    public AuthResponse login(AuthRequest dto) {
        var user = userRepository.findByEmail(dto.getEmail()).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.USER_NOT_EXISTED)
        );
        boolean isBanned = user.getRole().stream()
                .anyMatch(role -> Role.BANNED.name().equals(role.getName().toUpperCase()));

        if (isBanned) {
            throw new ApiRuntimeException(ErrorCode.BANNED);
        }
        PasswordEncoder passwordEncoder = new BCryptPasswordEncoder(10);
        boolean isOk =  passwordEncoder.matches(dto.getPassword(), user.getHash());
        if (!isOk) {
            throw new ApiRuntimeException(ErrorCode.UNAUTHENTICATED);
        }
        return genToken(user);
    }

    public AuthResponse refresh() {
        var context = SecurityContextHolder.getContext();
        String email = context.getAuthentication().getName();
        User user = userRepository.findByEmail(email).orElseThrow(
                () -> new ApiRuntimeException(ErrorCode.USER_NOT_EXISTED)
        );
        return genToken(user);
    }

    private AuthResponse genToken(User user) {
        JWSHeader header = new JWSHeader(JWSAlgorithm.HS512);
        JWTClaimsSet jwtClaimsSetAccess = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("kain344")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(3, ChronoUnit.HOURS).toEpochMilli()
                ))
                .claim("id", user.getId())
                .claim("scope", buildScope(user))
                .build();

        JWTClaimsSet jwtClaimsSetRefresh = new JWTClaimsSet.Builder()
                .subject(user.getEmail())
                .issuer("kain344")
                .issueTime(new Date())
                .expirationTime(new Date(
                        Instant.now().plus(15, ChronoUnit.DAYS).toEpochMilli()
                ))
                .claim("id", user.getId())
                .claim("scope", buildScope(user))
                .build();
        Payload payloadAccess = new Payload(jwtClaimsSetAccess.toJSONObject());
        Payload payloadRefresh = new Payload(jwtClaimsSetRefresh.toJSONObject());

        JWSObject jwsObjectAccess = new JWSObject(header, payloadAccess);
        JWSObject jwsObjectRefresh = new JWSObject(header, payloadRefresh);

        try {
            jwsObjectAccess.sign(new MACSigner(SIGNER_KEY.getBytes()));
            jwsObjectRefresh.sign(new MACSigner(SIGNER_KEY.getBytes()));
            user.setRefresh_token(jwsObjectRefresh.serialize());
            userRepository.save(user);
            return AuthResponse.builder()
                    .access_token(jwsObjectAccess.serialize())
                    .refresh_token(jwsObjectRefresh.serialize())
                    .build();
        } catch (JOSEException e) {
            throw new RuntimeException(e);
        }
    }

    public boolean verifyToken(String token) throws JOSEException, ParseException {
        JWSVerifier verifier = new MACVerifier(SIGNER_KEY.getBytes());
        SignedJWT signedJWT = SignedJWT.parse(token);
        Date expTime = signedJWT.getJWTClaimsSet().getExpirationTime();

        var isOk = signedJWT.verify(verifier);
        return isOk && expTime.after(new Date());

    }

    private String buildScope(User user) {
        StringJoiner stringJoiner = new StringJoiner(" ");
        if (!CollectionUtils.isEmpty(user.getRole())){
            user.getRole().forEach(
                    role -> stringJoiner.add("ROLE_" + role.getName())
            );
        }
        return stringJoiner.toString();
    }
}
