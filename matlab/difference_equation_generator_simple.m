clear; clc; close all
% Create symbolic variables.
syms K T s
% Define the transfer function for a PT1-element.
G_s = K / (T * s + 1);
% Create further symbolic variables needed for the z transform.
syms z timestep
% z transform (backwards / forwards / tustin).
transform_method = 'tustin';
if strcmp(transform_method, 'backwards')
    G_z = subs(G_s, s, (z - 1) / (z * timestep));
elseif strcmp(transform_method, 'forwards')
    G_z = subs(G_s, s, (z - 1) / (timestep));
elseif strcmp(transform_method,'tustin')
    G_z = subs(G_s, s, (2 * (z - 1)) / (timestep * (z + 1)));
end

% Simplify the equation.
G_z = simplifyFraction(G_z, 'Expand', true);
% Get the coefficients of the numerator and denominator.
[num, den] = numden(G_z);
num_coeffs = coeffs(num, z, 'All');
den_coeffs = coeffs(den, z, 'All');
% The coefficients are ordered from the highest to
% the lowest degree. Get a_n for further calculation.
a_n = den_coeffs(1);

% The degree of the numerator polynomial must not be greater 
% than the denominator polynomial.
m = length(num_coeffs) - 1;
n = length(den_coeffs) - 1;
if (m > n)
    disp('Error: degree numerator > degree denominator.')
    return
end

% Create the difference equation step by step.
diff_eq = 'u(k) = ';
% At first calculate the input part.
for i = m:-1:0
    if (i == n)
        diff_eq = [diff_eq, 'e(k) * ('];
    else
        diff_eq = [diff_eq, 'e(k-', num2str(n-i), ') * ('];
    end
    diff_eq = [diff_eq, char(num_coeffs(m+1-i) / a_n)];
    diff_eq = [diff_eq, ')'];
    if (i > 0)
        diff_eq = [diff_eq, ' + '];
    end
end
% Calculate the output part.
for i = n-1:-1:0
    diff_eq = [diff_eq, ' - u(k-', num2str(n-i), ') * (']; 
    diff_eq = [diff_eq, char(den_coeffs(n+1-i) / a_n)];
    diff_eq = [diff_eq, ')'];
end

% Print the resulting difference equation.
disp(diff_eq)