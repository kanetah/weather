package top.kanetah.weather.api.util

import org.apache.commons.lang.StringUtils
import org.apache.http.HttpResponse
import org.apache.http.client.HttpClient
import org.apache.http.client.methods.HttpGet
import org.apache.http.conn.scheme.Scheme
import org.apache.http.conn.ssl.SSLSocketFactory
import org.apache.http.impl.client.DefaultHttpClient
import javax.net.ssl.SSLContext
import javax.net.ssl.TrustManager
import javax.net.ssl.X509TrustManager
import java.io.UnsupportedEncodingException
import java.net.URLEncoder
import java.security.cert.X509Certificate

object HttpUtils {

    /**
     * get
     *
     * @param host
     * @param path
     * @param method
     * @param headers
     * @param querys
     * @return
     * @throws Exception
     */
    fun doGet(host: String, path: String, method: String,
              headers: Map<String, String>,
              querys: Map<String, String>): HttpResponse {
        val httpClient = wrapClient(host)

        val request = HttpGet(buildUrl(host, path, querys))
        for ((key, value) in headers) {
            request.addHeader(key, value)
        }

        return httpClient.execute(request)
    }

    @Throws(UnsupportedEncodingException::class)
    private fun buildUrl(host: String, path: String, querys: Map<String, String>?): String {
        val sbUrl = StringBuilder()
        sbUrl.append(host)
        if (!StringUtils.isBlank(path)) {
            sbUrl.append(path)
        }
        if (null != querys) {
            val sbQuery = StringBuilder()
            for ((key, value) in querys) {
                if (sbQuery.isNotEmpty()) {
                    sbQuery.append("&")
                }
                if (StringUtils.isBlank(key) && !StringUtils.isBlank(value)) {
                    sbQuery.append(value)
                }
                if (!StringUtils.isBlank(key)) {
                    sbQuery.append(key)
                    if (!StringUtils.isBlank(value)) {
                        sbQuery.append("=")
                        sbQuery.append(URLEncoder.encode(value, "utf-8"))
                    }
                }
            }
            if (sbQuery.isNotEmpty()) {
                sbUrl.append("?").append(sbQuery)
            }
        }

        return sbUrl.toString()
    }

    private fun wrapClient(host: String): HttpClient {
        val httpClient = DefaultHttpClient()
        if (host.startsWith("https://"))
            sslClient(httpClient)
        return httpClient
    }

    private fun sslClient(httpClient: HttpClient) {
        val ctx = SSLContext.getInstance("TLS")
        val tm = object : X509TrustManager {
            override fun getAcceptedIssuers(): Array<X509Certificate>? {
                return null
            }

            override fun checkClientTrusted(xcs: Array<X509Certificate>, str: String) {
            }

            override fun checkServerTrusted(xcs: Array<X509Certificate>, str: String) {
            }
        }
        ctx.init(null, arrayOf<TrustManager>(tm), null)
        val ssf = SSLSocketFactory(ctx)
        ssf.hostnameVerifier = SSLSocketFactory.ALLOW_ALL_HOSTNAME_VERIFIER
        val ccm = httpClient.connectionManager
        val registry = ccm.schemeRegistry
        registry.register(Scheme("https", 443, ssf))
    }
}
